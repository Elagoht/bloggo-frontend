import { IconFilter, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import RemovalRequestCard from "../../../components/pages/panel/removal-requests/RemovalRequestCard";
import RemovalRequestFiltersForm from "../../../forms/RemovalRequestFiltersForm";
import { getRemovalRequests, getUserRemovalRequests } from "../../../services/removal-requests";
import { useAuth } from "../../../hooks/useAuth";

type TabType = "my-requests" | "all-requests";

const RemovalRequestsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasPermission } = useAuth();
  const canViewAllRequests = hasPermission("post:delete");

  const [activeTab, setActiveTab] = useState<TabType>(
    canViewAllRequests ? "all-requests" : "my-requests"
  );
  const [removalRequestsResponse, setRemovalRequestsResponse] = useState<{
    data: RemovalRequestCard[];
    total: number;
    page: number;
    take: number;
  }>();
  const [myRequests, setMyRequests] = useState<RemovalRequestCard[]>();
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
      status: searchParams.get("status")
        ? parseInt(searchParams.get("status")!)
        : undefined,
    }),
    [searchParams]
  );

  const fetchMyRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUserRemovalRequests();
      setMyRequests(result.success ? result.data : undefined);
    } catch (err) {
      console.error("Error fetching my removal requests:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllRequests = useCallback(
    async (filters: typeof searchFilters) => {
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
    },
    []
  );

  useEffect(() => {
    if (activeTab === "my-requests") {
      fetchMyRequests();
    } else if (activeTab === "all-requests") {
      fetchAllRequests(searchFilters);
    }
  }, [activeTab, fetchMyRequests, fetchAllRequests, searchFilters]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Clear search params when switching to "My Requests"
    if (tab === "my-requests") {
      setSearchParams({});
    }
  };

  const currentData = activeTab === "my-requests" ? myRequests : removalRequestsResponse?.data;

  return (
    <ContentWithSidebar>
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconTrash}>
            Removal Requests
          </PageTitleWithIcon>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-smoke-200 dark:border-smoke-800">
          <button
            onClick={() => handleTabChange("my-requests")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === "my-requests"
                ? "border-gopher-500 text-gopher-600 dark:text-gopher-400"
                : "border-transparent text-smoke-600 dark:text-smoke-400 hover:text-smoke-900 dark:hover:text-smoke-100"
            }`}
          >
            My Requests
          </button>
          {canViewAllRequests && (
            <button
              onClick={() => handleTabChange("all-requests")}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "all-requests"
                  ? "border-gopher-500 text-gopher-600 dark:text-gopher-400"
                  : "border-transparent text-smoke-600 dark:text-smoke-400 hover:text-smoke-900 dark:hover:text-smoke-100"
              }`}
            >
              All Requests
            </button>
          )}
        </div>

        {!loading && !error && currentData && (
          <>
            <CardGrid>
              {currentData.length > 0 ? (
                currentData.map((request) => (
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
                    {activeTab === "my-requests"
                      ? "You haven't made any removal requests yet."
                      : searchFilters.q
                      ? "No removal requests match your search criteria."
                      : "There are no removal requests yet."}
                  </p>
                </div>
              )}
            </CardGrid>

            {activeTab === "all-requests" &&
              removalRequestsResponse &&
              Math.ceil(
                removalRequestsResponse.total / removalRequestsResponse.take
              ) > 1 && (
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

      {activeTab === "all-requests" && (
        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>
          <RemovalRequestFiltersForm />
        </Sidebar>
      )}
    </ContentWithSidebar>
  );
};

export default RemovalRequestsPage;
