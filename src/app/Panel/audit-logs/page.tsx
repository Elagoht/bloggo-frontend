import { IconHistory } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PermissionGuard from "../../../components/Guards/PermissionGuard";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import { AuditLog, AuditLogsResponse, getAuditLogs } from "../../../services/audit";
import { getUsers } from "../../../services/users";

const AuditLogsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [auditLogsResponse, setAuditLogsResponse] = useState<AuditLogsResponse | null>(null);
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
        const userIds = [...new Set(
          result.data.data
            .map(log => log.userId)
            .filter((id): id is number => id !== null)
        )];
        
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

  const formatAction = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  };

  const formatEntity = (entity: string) => {
    return entity.charAt(0).toUpperCase() + entity.slice(1);
  };

  const getUserName = (userId: number | null) => {
    if (!userId) return "System";
    const user = users.get(userId);
    return user ? user.name : `User #${userId}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <RouteGuard>
      <PermissionGuard permission="auditlog:view">
        <Container size="xl">
          <PageTitleWithIcon icon={IconHistory}>Audit Logs</PageTitleWithIcon>

          {loading && <div className="text-center py-8">Loading audit logs...</div>}
          
          {error && (
            <div className="text-center py-8 text-red-600">
              Error loading audit logs: {error.message}
            </div>
          )}

          {auditLogsResponse && !loading && (
            <div className="space-y-4">
              {auditLogsResponse.data.length === 0 ? (
                <div className="text-center py-8 text-smoke-500">
                  No audit logs found.
                </div>
              ) : (
                <>
                  <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-smoke-50 dark:bg-smoke-800 border-b border-smoke-200 dark:border-smoke-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-smoke-300 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-smoke-300 uppercase tracking-wider">
                              Action
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-smoke-300 uppercase tracking-wider">
                              Entity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-smoke-300 uppercase tracking-wider">
                              Entity ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-smoke-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-smoke-200 dark:divide-smoke-700">
                          {auditLogsResponse.data.map((log) => (
                            <tr key={log.id} className="hover:bg-smoke-50 dark:hover:bg-smoke-800/50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-smoke-900 dark:text-smoke-100">
                                {getUserName(log.userId)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gopher-100 dark:bg-gopher-900 text-gopher-800 dark:text-gopher-200">
                                  {formatAction(log.action)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
                                {formatEntity(log.entity)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
                                #{log.entityId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-500 dark:text-smoke-400">
                                {formatDateTime(log.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Pagination
                    currentPage={auditLogsResponse.page}
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