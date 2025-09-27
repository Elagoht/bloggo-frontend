import { IconHistory, IconFilter } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RouteGuard from "../../../components/guards/RouteGuard";
import Container from "../../../components/layout/Container";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import { getAuditLogs } from "../../../services/audit";
import { getUsers } from "../../../services/users";
import { getCategories } from "../../../services/categories";
import { getTags } from "../../../services/tags";
import AuditLogTable from "../../../components/pages/panel/audit-logs/AuditLogTable";
import AuditLogFiltersForm from "../../../forms/AuditLogFiltersForm";
import NoDataRecorded from "../../../components/common/NoDataRecorded";

const AuditLogsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [auditLogsResponse, setAuditLogsResponse] =
    useState<AuditLogsResponse | null>(null);
  const [users, setUsers] = useState<Map<number, UserCard>>(new Map());
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [tags, setTags] = useState<TagCard[]>([]);
  const [loading, setLoading] = useState(false);

  // Create a reactive memo for search params that will trigger resource updates
  const searchFilters = useMemo(
    () => {
      const parseArrayParam = (paramName: string): string[] => {
        const param = searchParams.get(paramName);
        return param ? param.split(',').filter(Boolean) : [];
      };

      const parseUserIds = (): number[] => {
        const userIdParams = parseArrayParam('userId');
        return userIdParams.map(id => parseInt(id)).filter(id => !isNaN(id));
      };

      // Parse action filters from URL
      const actionFilters = parseArrayParam('action');

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
        entityType: parseArrayParam('entityType').length > 0 ? parseArrayParam('entityType') : undefined,
        action: finalActionFilters,
        categories: parseArrayParam('categories').length > 0 ? parseArrayParam('categories') : undefined,
        tags: parseArrayParam('tags').length > 0 ? parseArrayParam('tags') : undefined,
      };
    },
    [searchParams]
  );

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

  // Fetch all categories for filter dropdown
  const fetchAllCategories = useCallback(async () => {
    const categoriesResult = await getCategories({ take: 1000 });
    if (categoriesResult.success) {
      setCategories(categoriesResult.data.data);
    }
  }, []);

  // Fetch all tags for filter dropdown
  const fetchAllTags = useCallback(async () => {
    const tagsResult = await getTags({ take: 1000 });
    if (tagsResult.success) {
      setTags(tagsResult.data.data);
    }
  }, []);


  useEffect(() => {
    fetchAllUsers();
    fetchAllCategories();
    fetchAllTags();
  }, [fetchAllUsers, fetchAllCategories, fetchAllTags]);

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
                  <AuditLogTable
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
          <AuditLogFiltersForm
            users={users}
            categories={categories}
            tags={tags}
          />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default AuditLogsPage;
