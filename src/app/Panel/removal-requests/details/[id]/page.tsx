import { IconCalendar, IconTrash, IconUser } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouteGuard from "../../../../../components/guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import {
  getRemovalRequestById,
  approveRemovalRequest,
  rejectRemovalRequest,
  getRemovalRequestStatusText,
  getRemovalRequestStatusColor,
  REMOVAL_REQUEST_STATUS,
} from "../../../../../services/removal-requests";
import IconBadge from "../../../../../components/common/IconBadge";
import HoldButton from "../../../../../components/form/HoldButton";

const RemovalRequestDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [removalRequest, setRemovalRequest] =
    useState<RemovalRequestDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRemovalRequestDetails = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const result = await getRemovalRequestById(parseInt(id));
      if (result.success) {
        setRemovalRequest(result.data);
      } else {
        if (result.status === 404) {
          navigate("/removal-requests");
          return;
        }
        setError(
          new Error(result.error?.message || "Failed to load removal request")
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleApprove = async () => {
    if (!removalRequest) return;

    try {
      setActionLoading("approve");
      const result = await approveRemovalRequest(removalRequest.id);
      if (result.success) {
        await fetchRemovalRequestDetails();
      } else {
        setError(
          new Error(result.error?.message || "Failed to approve request")
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!removalRequest) return;

    try {
      setActionLoading("reject");
      const result = await rejectRemovalRequest(removalRequest.id);
      if (result.success) {
        await fetchRemovalRequestDetails();
      } else {
        setError(
          new Error(result.error?.message || "Failed to reject request")
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchRemovalRequestDetails();
  }, [fetchRemovalRequestDetails]);

  if (loading) {
    return (
      <RouteGuard permission="post:delete" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-smoke-500 dark:text-smoke-400">Loading...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  if (error || !removalRequest) {
    return (
      <RouteGuard permission="post:delete" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">Error loading removal request</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  const statusText = getRemovalRequestStatusText(removalRequest.status);
  const statusColor = getRemovalRequestStatusColor(removalRequest.status);
  const isPending = removalRequest.status === REMOVAL_REQUEST_STATUS.PENDING;

  return (
    <RouteGuard permission="post:delete" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconTrash}>
            Removal Request Details
          </PageTitleWithIcon>

          <IconBadge
            color={statusColor as "primary" | "success" | "warning" | "danger"}
          >
            {statusText}
          </IconBadge>
        </div>

        <div className="space-y-6">
          {/* Post Information */}
          <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
            <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
              Post Information
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-smoke-900 dark:text-smoke-100 mb-2">
                  {removalRequest.postTitle}
                </h4>
                <div className="text-sm text-smoke-600 dark:text-smoke-400 bg-smoke-50 dark:bg-smoke-900 p-3 rounded-lg">
                  <div className="line-clamp-3">{removalRequest.postContent}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Request Information */}
          <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
            <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
              Request Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {removalRequest.requestedBy.avatar ? (
                    <img
                      src={
                        import.meta.env.VITE_API_URL +
                        removalRequest.requestedBy.avatar
                      }
                      alt="Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <IconUser size={20} />
                  )}
                  <span className="font-medium">
                    {removalRequest.requestedBy.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-smoke-600 dark:text-smoke-400">
                  <IconCalendar size={16} />
                  <span>
                    {new Date(removalRequest.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {removalRequest.note && (
                <div>
                  <h4 className="font-medium text-smoke-900 dark:text-smoke-100 mb-2">
                    Reason for removal:
                  </h4>
                  <p className="text-sm text-smoke-600 dark:text-smoke-400 bg-smoke-50 dark:bg-smoke-900 p-3 rounded-lg">
                    {removalRequest.note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Decision Information */}
          {removalRequest.decidedBy && removalRequest.decidedAt && (
            <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
              <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
                Decision Information
              </h3>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {removalRequest.decidedBy.avatar ? (
                    <img
                      src={
                        import.meta.env.VITE_API_URL +
                        removalRequest.decidedBy.avatar
                      }
                      alt="Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <IconUser size={20} />
                  )}
                  <span className="font-medium">
                    {removalRequest.decidedBy.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-smoke-600 dark:text-smoke-400">
                  <IconCalendar size={16} />
                  <span>
                    {new Date(removalRequest.decidedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isPending && (
            <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
              <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
                Actions
              </h3>

              <div className="flex gap-4">
                <HoldButton
                  color="success"
                  onClick={handleApprove}
                  disabled={actionLoading !== null}
                  confirmTitle="Approve Removal Request"
                  confirmMessage="Are you sure you want to approve this removal request? This action will permanently delete the post."
                  confirmActionText="Approve"
                  className="flex-1"
                >
                  {actionLoading === "approve" ? "Approving..." : "Approve"}
                </HoldButton>

                <HoldButton
                  color="danger"
                  onClick={handleReject}
                  disabled={actionLoading !== null}
                  confirmTitle="Reject Removal Request"
                  confirmMessage="Are you sure you want to reject this removal request?"
                  confirmActionText="Reject"
                  className="flex-1"
                >
                  {actionLoading === "reject" ? "Rejecting..." : "Reject"}
                </HoldButton>
              </div>
            </div>
          )}
        </div>
      </Container>
    </RouteGuard>
  );
};

export default RemovalRequestDetailsPage;