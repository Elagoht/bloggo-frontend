import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconUsers, IconFilter, IconPlus } from "@tabler/icons-react";
import Button from "../../../components/form/Button";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import Pagination from "../../../components/layout/Container/Pagination";
import UserCard from "../../../components/pages/panel/users/UserCard";
import UserFiltersForm from "../../../forms/UserFiltersForm";
import { getUsers } from "../../../services/users";
import NoUsersYet from "../../../components/pages/panel/users/NoUsersYet";
import RouteGuard from "../../../components/Guards/RouteGuard";
import PermissionGuard from "../../../components/Guards/PermissionGuard";

interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = () => {
  const [searchParams] = useSearchParams();
  const [usersResponse, setUsersResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create a reactive memo for search params that will trigger resource updates
  const searchFilters = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      order: searchParams.get("order") || "",
      dir: searchParams.get("dir") || "",
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "10"),
    }),
    [searchParams]
  );

  const fetchUsers = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUsers(filters);
      setUsersResponse(result.success ? result.data : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(searchFilters);
  }, [fetchUsers, searchFilters]);

  return (
    <RouteGuard permission="user:view" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconUsers}>Users</PageTitleWithIcon>

            <PermissionGuard permission="user:create">
              <Button href="/users/create" color="success" iconRight={IconPlus}>
                New User
              </Button>
            </PermissionGuard>
          </div>

          {!loading && !error && usersResponse && (
            <>
              <CardGrid>
                {usersResponse.data && usersResponse.data.length > 0 ? (
                  usersResponse.data.map((user: ResponseUserCard) => (
                    <UserCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      avatar={user.avatar}
                      roleName={user.roleName}
                      writtenPostCount={user.writtenPostCount}
                      publishedPostCount={user.publishedPostCount}
                    />
                  ))
                ) : (
                  <NoUsersYet />
                )}
              </CardGrid>

              {usersResponse && (
                <Pagination
                  totalItems={usersResponse.total || 0}
                  itemsPerPage={usersResponse.take || 10}
                />
              )}
            </>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>

          <UserFiltersForm />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default UsersPage;
