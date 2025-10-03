import {
  IconAlertCircle,
  IconCheck,
  IconClearAll,
  IconExternalLink,
  IconSearch,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoDataRecorded from "../../../../components/common/NoDataRecorded";
import RouteGuard from "../../../../components/guards/RouteGuard";
import Container from "../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import Pagination from "../../../../components/layout/Container/Pagination";
import { getRequests } from "../../../../services/webhook";
import { WebhookRequest } from "../../../../types/webhook";
import Button from "../../../../components/form/Button";
import Input from "../../../../components/form/Input";

const WebhookRequestsPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = useState<WebhookRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || undefined;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await getRequests(limit, offset, search);
      if (response.success && response.data) {
        setRequests(response.data.data);
        setTotal(response.data.total);
      } else {
        setRequests([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Failed to fetch webhook requests:", error);
      setRequests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleSearch = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set("search", searchInput.trim());
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1"); // Reset to first page on search
    setSearchParams(newParams);
  }, [searchInput, searchParams, setSearchParams]);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    newParams.set("page", "1");
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const getStatusBadge = (request: WebhookRequest) => {
    if (!request.responseStatus) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <IconX size={14} />
          Failed
        </span>
      );
    }

    if (request.responseStatus >= 200 && request.responseStatus < 300) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <IconCheck size={14} />
          {request.responseStatus}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
        <IconAlertCircle size={14} />
        {request.responseStatus}
      </span>
    );
  };

  return (
    <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconWebhook}>
            Webhook Requests
          </PageTitleWithIcon>

          <Button
            onClick={() => navigate("/webhook")}
            variant="text"
            iconLeft={IconExternalLink}
          >
            Webhook Settings
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSearch()}
              placeholder="Search by event, entity"
              className="w-full px-4 py-2 pl-10 border border-smoke-300 dark:border-smoke-700 rounded-lg bg-white dark:bg-smoke-900 text-smoke-900 dark:text-smoke-100 placeholder-smoke-400 dark:placeholder-smoke-500 focus:ring-2 focus:ring-gopher-500 focus:border-transparent"
              iconLeft={IconSearch}
            />
          </div>
          <Button onClick={handleSearch} iconLeft={IconSearch}>
            Search
          </Button>
          {search && (
            <Button
              onClick={handleClearSearch}
              variant="text"
              iconLeft={IconClearAll}
            >
              Clear
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-smoke-500 dark:text-smoke-400">Loading...</div>
          </div>
        ) : requests.length > 0 ? (
          <>
            {/* Requests Table */}
            <div className="bg-white dark:bg-smoke-950 rounded-lg border border-smoke-200 dark:border-smoke-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-smoke-50 dark:bg-smoke-900 border-b border-smoke-200 dark:border-smoke-800">
                    <tr>
                      {["ID", "Event", "Entity", "Status", "Attempts", "Created", "Actions"].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-smoke-200 dark:divide-smoke-800">
                    {requests.map((request) => (
                      <tr
                        key={request.id}
                        className={classNames(
                          "hover:bg-smoke-50 dark:hover:bg-smoke-900/50 transition-colors",
                          {
                            "bg-red-50/50 dark:bg-red-950/20":
                              !request.responseStatus,
                          }
                        )}
                      >
                        <td className="px-4 py-3 text-sm text-smoke-900 dark:text-smoke-100">
                          #{request.id}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gopher-100 dark:bg-gopher-900/30 text-gopher-800 dark:text-gopher-300 rounded">
                            {request.event}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-smoke-700 dark:text-smoke-300">
                          {request.entity}
                          {request.slug && (
                            <span className="ml-1 text-smoke-500 dark:text-smoke-500">
                              ({request.slug})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(request)}</td>
                        <td className="px-4 py-3 text-sm text-smoke-700 dark:text-smoke-300">
                          {request.attemptCount}
                        </td>
                        <td className="px-4 py-3 text-sm text-smoke-700 dark:text-smoke-300">
                          {new Date(request.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              navigate(`/webhook/requests/${request.id}`)
                            }
                            className="text-sm font-medium text-gopher-600 dark:text-gopher-400 hover:text-gopher-700 dark:hover:text-gopher-300 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination totalItems={total} itemsPerPage={limit} />
          </>
        ) : (
          <NoDataRecorded
            message="No webhook requests found"
            description={
              search
                ? "No webhook requests match your search criteria."
                : "No webhook requests have been sent yet. Configure your webhook and trigger an event to see requests here."
            }
          />
        )}
      </Container>
    </RouteGuard>
  );
};

export default WebhookRequestsPage;
