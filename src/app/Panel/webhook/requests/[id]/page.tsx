import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheck,
  IconCode,
  IconExternalLink,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouteGuard from "../../../../../components/Guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import { getRequestById } from "../../../../../services/webhook";
import { WebhookRequest } from "../../../../../types/webhook";

const WebhookRequestDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [request, setRequest] = useState<WebhookRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRequestDetails = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const result = await getRequestById(parseInt(id));
      if (result.success && result.data) {
        setRequest(result.data);
      } else {
        if (result.status === 404) {
          navigate("/webhook/requests");
          return;
        }
        setError(
          new Error(result.error?.message || "Failed to load webhook request")
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchRequestDetails();
  }, [fetchRequestDetails]);

  const getStatusBadge = (request: WebhookRequest) => {
    if (!request.responseStatus) {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <IconX size={16} />
          Failed
        </div>
      );
    }

    if (request.responseStatus >= 200 && request.responseStatus < 300) {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <IconCheck size={16} />
          {request.responseStatus}
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
        <IconAlertCircle size={16} />
        {request.responseStatus}
      </div>
    );
  };

  const formatJson = (jsonString: string) => {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch {
      return jsonString;
    }
  };

  if (loading) {
    return (
      <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-smoke-500 dark:text-smoke-400">Loading...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  if (error || !request) {
    return (
      <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">Error loading webhook request</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/webhook/requests")}
              className="p-2 hover:bg-smoke-100 dark:hover:bg-smoke-800 rounded-lg transition-colors"
            >
              <IconArrowLeft size={20} />
            </button>
            <PageTitleWithIcon icon={IconWebhook}>
              Webhook Request #{request.id}
            </PageTitleWithIcon>
          </div>

          {getStatusBadge(request)}
        </div>

        {/* Request Overview */}
        <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-4 flex flex-col mb-6">
          <SectionHeader icon={IconExternalLink}>Overview</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide mb-1">
                Event
              </div>
              <div className="inline-block px-2 py-1 text-sm font-medium bg-gopher-100 dark:bg-gopher-900/30 text-gopher-800 dark:text-gopher-300 rounded">
                {request.event}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide mb-1">
                Entity
              </div>
              <div className="text-sm text-smoke-900 dark:text-smoke-100">
                {request.entity}
                {request.entityId && (
                  <span className="ml-1 text-smoke-500 dark:text-smoke-500">
                    (ID: {request.entityId})
                  </span>
                )}
                {request.slug && (
                  <span className="ml-1 text-smoke-500 dark:text-smoke-500">
                    ({request.slug})
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide mb-1">
                Attempt Count
              </div>
              <div
                className={classNames("text-sm font-medium", {
                  "text-green-600 dark:text-green-400":
                    request.attemptCount === 1,
                  "text-orange-600 dark:text-orange-400":
                    request.attemptCount > 1 && request.attemptCount <= 3,
                  "text-red-600 dark:text-red-400": request.attemptCount > 3,
                })}
              >
                {request.attemptCount} attempt
                {request.attemptCount !== 1 ? "s" : ""}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide mb-1">
                Created At
              </div>
              <div className="text-sm text-smoke-900 dark:text-smoke-100">
                {new Date(request.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {request.errorMessage && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <IconAlertCircle
                size={20}
                className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <div className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Error Message
                </div>
                <div className="text-sm text-red-800 dark:text-red-200 font-mono">
                  {request.errorMessage}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Body */}
        <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-4 flex flex-col mb-6">
          <SectionHeader icon={IconCode}>Request Body</SectionHeader>

          <div className="bg-smoke-50 dark:bg-smoke-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs text-smoke-900 dark:text-smoke-100 font-mono whitespace-pre-wrap break-words">
              {formatJson(request.requestBody)}
            </pre>
          </div>
        </div>

        {/* Response Body */}
        {request.responseBody && (
          <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-4 flex flex-col">
            <SectionHeader icon={IconCode}>Response Body</SectionHeader>

            <div className="bg-smoke-50 dark:bg-smoke-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-smoke-900 dark:text-smoke-100 font-mono whitespace-pre-wrap break-words">
                {formatJson(request.responseBody)}
              </pre>
            </div>
          </div>
        )}
      </Container>
    </RouteGuard>
  );
};

export default WebhookRequestDetailsPage;
