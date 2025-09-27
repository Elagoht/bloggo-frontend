import { IconFilter, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RouteGuard from "../../../components/guards/RouteGuard";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import RemovalRequestCard from "../../../components/pages/panel/removal-requests/RemovalRequestCard";
import {
  getRemovalRequests,
  REMOVAL_REQUEST_STATUS,
} from "../../../services/removal-requests";
import Select from "../../../components/form/Select";

const RemovalRequestsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [removalRequests, setRemovalRequests] = useState<
    RemovalRequestCard[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const statusFilter = searchParams.get("status");

  const fetchRemovalRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRemovalRequests();
      setRemovalRequests(result.success ? result.data : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredRequests = useMemo(() => {
    if (!removalRequests) return [];

    if (statusFilter === null || statusFilter === "" || statusFilter === "all") {
      return removalRequests;
    }

    const statusValue = parseInt(statusFilter);
    return removalRequests.filter((request) => request.status === statusValue);
  }, [removalRequests, statusFilter]);

  useEffect(() => {
    fetchRemovalRequests();
  }, [fetchRemovalRequests]);

  const handleStatusFilterChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }
    setSearchParams(newParams);
  };

  // Auto-filter to show pending by default if no filter is set
  useEffect(() => {
    if (!statusFilter) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("status", REMOVAL_REQUEST_STATUS.PENDING.toString());
      setSearchParams(newParams);
    }
  }, [statusFilter, searchParams, setSearchParams]);

  return (
    <RouteGuard permission="post:delete" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconTrash}>
              Removal Requests
            </PageTitleWithIcon>
          </div>

          {!loading && !error && (
            <CardGrid>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
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
                    {statusFilter === REMOVAL_REQUEST_STATUS.PENDING.toString()
                      ? "There are no pending removal requests."
                      : "No removal requests match the current filter."}
                  </p>
                </div>
              )}
            </CardGrid>
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2">
                Status
              </label>
              <Select
                value={statusFilter || REMOVAL_REQUEST_STATUS.PENDING.toString()}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value={REMOVAL_REQUEST_STATUS.PENDING.toString()}>
                  Pending
                </option>
                <option value={REMOVAL_REQUEST_STATUS.APPROVED.toString()}>
                  Approved
                </option>
                <option value={REMOVAL_REQUEST_STATUS.REJECTED.toString()}>
                  Rejected
                </option>
              </Select>
            </div>
          </div>
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default RemovalRequestsPage;