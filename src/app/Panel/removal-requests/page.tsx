import { IconFilter, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RouteGuard from "../../../components/guards/RouteGuard";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import RemovalRequestCard from "../../../components/pages/panel/removal-requests/RemovalRequestCard";
import RemovalRequestFiltersForm from "../../../forms/RemovalRequestFiltersForm";
import { getRemovalRequests } from "../../../services/removal-requests";

const RemovalRequestsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [removalRequestsResponse, setRemovalRequestsResponse] = useState<{
    data: RemovalRequestCard[];
    total: number;
    page: number;
    take: number;
  }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create a reactive memo for search params that will trigger resource updates
  const searchFilters = useMemo(
    () => ({
      q: searchParams.get("q") || undefined,
      order: searchParams.get("order") || "created_at",
      dir: (searchParams.get("dir") as "asc" | "desc") || "desc",
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "12"),
      status: searchParams.get("status") ? parseInt(searchParams.get("status")!) : undefined,
    }),
    [searchParams]
  );

  const fetchRemovalRequests = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRemovalRequests(filters);
      setRemovalRequestsResponse(result.success ? result.data : undefined);
    } catch (err) {
      console.error("Error fetching removal requests:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRemovalRequests(searchFilters);
  }, [fetchRemovalRequests, searchFilters]);

  return (
    <RouteGuard permission="post:delete" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconTrash}>
              Removal Requests
            </PageTitleWithIcon>
          </div>

          {!loading && !error && removalRequestsResponse && (
            <>
              <CardGrid>
                {removalRequestsResponse.data.length > 0 ? (
                  removalRequestsResponse.data.map((request) => (
                    <RemovalRequestCard key={request.id} {...request} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <IconTrash
                      size={48}
                      className="mx-auto mb-4 text-smoke-400 dark:text-smoke-500"
                    />
                    <h3 className="text-lg font-medium text-smoke-900 dark:text-smoke-100 mb-2">
                      No removal requests found
                    </h3>
                    <p className="text-smoke-600 dark:text-smoke-400">
                      {searchFilters.q
                        ? "No removal requests match your search criteria."
                        : "There are no removal requests yet."}
                    </p>
                  </div>
                )}
              </CardGrid>

              {Math.ceil(removalRequestsResponse.total / removalRequestsResponse.take) > 1 && (
                <Pagination
                  totalItems={removalRequestsResponse.total}
                  itemsPerPage={removalRequestsResponse.take}
                />
              )}
            </>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="text-smoke-500 dark:text-smoke-400">
                Loading...
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-500">Error loading removal requests</div>
            </div>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>
          <RemovalRequestFiltersForm />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default RemovalRequestsPage;
