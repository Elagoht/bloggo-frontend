import { IconHistory } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PermissionGuard from "../../../components/Guards/PermissionGuard";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import { getAuditLogs } from "../../../services/audit";
import { getUsers } from "../../../services/users";
import AuditLogTable from "../../../components/pages/panel/audit-logs/AuditLogTable";
import AuditLogEmptyState from "../../../components/pages/panel/audit-logs/AuditLogEmptyState";
import AuditLogLoadingState from "../../../components/pages/panel/audit-logs/AuditLogLoadingState";
import AuditLogErrorState from "../../../components/pages/panel/audit-logs/AuditLogErrorState";

const AuditLogsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [auditLogsResponse, setAuditLogsResponse] =
    useState<AuditLogsResponse | null>(null);
  const [users, setUsers] = useState<Map<number, any>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create a reactive memo for search params that will trigger resource updates
  const searchFilters = useMemo(
    () => ({
      order: searchParams.get("order") || "created_at",
      dir: searchParams.get("dir") || "desc",
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "20"),
    }),
    [searchParams]
  );

  const fetchAuditLogs = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAuditLogs(filters);
      if (result.success) {
        setAuditLogsResponse(result.data);

        // Extract unique user IDs from audit logs
        const userIds = [
          ...new Set(
            result.data.data
              .map((log) => log.userId)
              .filter((id): id is number => id !== null)
          ),
        ];

        // Fetch user data for all unique user IDs
        if (userIds.length > 0) {
          const usersResult = await getUsers({ take: 1000 }); // Get all users
          if (usersResult.success) {
            const userMap = new Map();
            usersResult.data.data.forEach((user: any) => {
              userMap.set(user.id, user);
            });
            setUsers(userMap);
          }
        }
      } else {
        setAuditLogsResponse(null);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs(searchFilters);
  }, [searchFilters, fetchAuditLogs]);

  return (
    <RouteGuard>
      <PermissionGuard permission="auditlog:view">
        <Container size="xl">
          <PageTitleWithIcon icon={IconHistory}>Audit Logs</PageTitleWithIcon>

          {loading && <AuditLogLoadingState />}

          {error && <AuditLogErrorState error={error} />}

          {auditLogsResponse && !loading && (
            <div className="space-y-4">
              {auditLogsResponse.data.length === 0 ? (
                <AuditLogEmptyState />
              ) : (
                <>
                  <AuditLogTable
                    auditLogs={auditLogsResponse.data}
                    users={users}
                  />

                  <Pagination
                    totalItems={auditLogsResponse.total}
                    itemsPerPage={auditLogsResponse.take}
                  />
                </>
              )}
            </div>
          )}
        </Container>
      </PermissionGuard>
    </RouteGuard>
  );
};

export default AuditLogsPage;
