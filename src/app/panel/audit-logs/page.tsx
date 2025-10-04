import { IconFilter, IconHistory } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoDataRecorded from "../../../components/common/NoDataRecorded";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import AuditLogList from "../../../components/pages/panel/audit-logs/AuditLogList";
import AuditLogFiltersForm from "../../../forms/AuditLogFiltersForm";
import { getAuditLogs } from "../../../services/audit";
import { getUsers } from "../../../services/users";

const AuditLogsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [auditLogsResponse, setAuditLogsResponse] =
    useState<AuditLogsResponse | null>(null);
  const [users, setUsers] = useState<Map<number, UserCard>>(new Map());
  const [loading, setLoading] = useState(false);

  // Create a reactive memo for search params that will trigger resource updates
  const searchFilters = useMemo(() => {
    const parseArrayParam = (paramName: string): string[] => {
      const param = searchParams.get(paramName);
      return param ? param.split(",").filter(Boolean) : [];
    };

    const parseUserIds = (): number[] => {
      const userIdParams = parseArrayParam("userId");
      return userIdParams.map((id) => parseInt(id)).filter((id) => !isNaN(id));
    };

    // Parse action filters from URL
    const actionFilters = parseArrayParam("action");

    // Send action filters only if explicitly specified by user
    let finalActionFilters = undefined;

    if (actionFilters.length > 0) {
      // User explicitly selected actions - use exactly what they selected
      finalActionFilters = actionFilters;
    }
    // If no action filters specified, send undefined to get all actions from backend

    return {
      order: searchParams.get("order") || "created_at",
      dir: searchParams.get("dir") || "desc",
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "20"),
      userId: parseUserIds().length > 0 ? parseUserIds() : undefined,
      entityType:
        parseArrayParam("entityType").length > 0
          ? parseArrayParam("entityType")
          : undefined,
      action: finalActionFilters,
    };
  }, [searchParams]);

  const fetchAuditLogs = useCallback(async (filters: AuditLogFilters) => {
    setLoading(true);
    const result = await getAuditLogs(filters);
    if (result.success) {
      setAuditLogsResponse(result.data);
    } else {
      setAuditLogsResponse(null);
    }
    setLoading(false);
  }, []);

  // Fetch all users for filter dropdown
  const fetchAllUsers = useCallback(async () => {
    const usersResult = await getUsers({ take: 1000 });
    if (usersResult.success) {
      const userMap = new Map<number, UserCard>();
      usersResult.data.data.forEach((user) => {
        userMap.set(user.id, user);
      });
      setUsers(userMap);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    fetchAuditLogs(searchFilters);
  }, [searchFilters, fetchAuditLogs]);

  return (
    <RouteGuard>
      <ContentWithSidebar>
        <Container>
          <PageTitleWithIcon icon={IconHistory}>Audit Logs</PageTitleWithIcon>

          {!loading && (
            <>
              {auditLogsResponse && auditLogsResponse.logs.length > 0 ? (
                <>
                  <AuditLogList
                    auditLogs={auditLogsResponse.logs}
                    users={users}
                  />

                  <Pagination
                    totalItems={auditLogsResponse.total}
                    itemsPerPage={parseInt(searchParams.get("take") || "20")}
                  />
                </>
              ) : (
                <NoDataRecorded
                  message="No audit logs found"
                  description="No audit logs match the current filters. Try adjusting your search criteria."
                />
              )}
            </>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>
          <AuditLogFiltersForm users={users} />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default AuditLogsPage;
