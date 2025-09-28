import {
  IconCertificate,
  IconCheck,
  IconClock,
  IconPaperclip,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../../../components/common/Dialog";
import HoldButton from "../../../../../components/form/HoldButton";
import RouteGuard from "../../../../../components/guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import {
  approveRemovalRequest,
  getRemovalRequestById,
  rejectRemovalRequest,
  REMOVAL_REQUEST_STATUS,
} from "../../../../../services/removal-requests";

const RemovalRequestDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getStatusText = (status: number): string => {
    switch (status) {
      case REMOVAL_REQUEST_STATUS.PENDING:
        return "Pending";
      case REMOVAL_REQUEST_STATUS.APPROVED:
        return "Approved";
      case REMOVAL_REQUEST_STATUS.REJECTED:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number): "warning" | "success" | "danger" => {
    switch (status) {
      case REMOVAL_REQUEST_STATUS.PENDING:
        return "warning";
      case REMOVAL_REQUEST_STATUS.APPROVED:
        return "success";
      case REMOVAL_REQUEST_STATUS.REJECTED:
        return "danger";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case REMOVAL_REQUEST_STATUS.PENDING:
        return IconClock;
      case REMOVAL_REQUEST_STATUS.APPROVED:
        return IconCheck;
      case REMOVAL_REQUEST_STATUS.REJECTED:
        return IconX;
      default:
        return IconClock;
    }
  };

  const [removalRequest, setRemovalRequest] =
    useState<RemovalRequestDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showDecisionNoteDialog, setShowDecisionNoteDialog] = useState<"approve" | "reject" | null>(null);
  const [decisionNote, setDecisionNote] = useState("");

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

  const handleApproveConfirmed = () => {
    setShowDecisionNoteDialog("approve");
  };

  const handleRejectConfirmed = () => {
    setShowDecisionNoteDialog("reject");
  };

  const handleApprove = async () => {
    if (!removalRequest) return;

    try {
      setActionLoading("approve");
      const result = await approveRemovalRequest(removalRequest.id, {
        decisionNote: decisionNote.trim(),
      });
      if (result.success) {
        setShowDecisionNoteDialog(null);
        setDecisionNote("");
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
      const result = await rejectRemovalRequest(removalRequest.id, {
        decisionNote: decisionNote.trim(),
      });
      if (result.success) {
        setShowDecisionNoteDialog(null);
        setDecisionNote("");
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

  const statusText = getStatusText(removalRequest.status);
  const statusColor = getStatusColor(removalRequest.status);
  const StatusIcon = getStatusIcon(removalRequest.status);
  const isPending = removalRequest.status === REMOVAL_REQUEST_STATUS.PENDING;

  return (
    <RouteGuard permission="post:delete" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconTrash}>
            Removal Request Details
          </PageTitleWithIcon>

          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              statusColor === "warning"
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                : statusColor === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}
          >
            <StatusIcon size={14} />
            <span>{statusText}</span>
          </div>
        </div>

        {/* Post Information */}
        <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-4 flex flex-col">
          <SectionHeader icon={IconPaperclip}>Post Information</SectionHeader>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Cover Image */}
            <div className="w-full md:w-48 md:flex-shrink-0">
              {removalRequest.postCoverUrl ? (
                <img
                  src={
                    import.meta.env.VITE_API_URL + removalRequest.postCoverUrl
                  }
                  alt="Post cover"
                  className="w-full aspect-video object-cover rounded-lg"
                />
              ) : (
                <div className="w-full aspect-video bg-smoke-100 dark:bg-smoke-800 rounded-lg flex items-center justify-center">
                  <IconPaperclip
                    size={24}
                    className="text-smoke-400 dark:text-smoke-600"
                  />
                </div>
              )}
            </div>

            {/* Post Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-smoke-900 dark:text-smoke-100 mb-3 line-clamp-2">
                {removalRequest.postTitle}
              </h4>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {removalRequest.postWriter.avatar ? (
                    <img
                      src={
                        import.meta.env.VITE_API_URL +
                        removalRequest.postWriter.avatar
                      }
                      alt="Writer avatar"
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <IconUser size={16} />
                  )}
                  <span className="font-medium text-smoke-900 dark:text-smoke-100">
                    {removalRequest.postWriter.name}
                  </span>
                </div>

                {removalRequest.postCategory && (
                  <span className="px-2 py-1 bg-gopher-100 dark:bg-gopher-900/30 text-gopher-800 dark:text-gopher-300 rounded-md text-xs font-medium">
                    {removalRequest.postCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Request Information */}
        <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 flex flex-col gap-4 p-4">
          <SectionHeader icon={IconUser}>Request Information</SectionHeader>

          <div className="flex items-center gap-2 text-sm text-smoke-700 dark:text-smoke-300">
            {removalRequest.requestedBy.avatar ? (
              <img
                src={
                  import.meta.env.VITE_API_URL +
                  removalRequest.requestedBy.avatar
                }
                alt="Avatar"
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <IconUser size={16} />
            )}
            <span className="font-medium text-smoke-900 dark:text-smoke-100">
              {removalRequest.requestedBy.name}
            </span>
            <span>requested removal on</span>
            <span className="font-medium">
              {new Date(removalRequest.createdAt).toLocaleDateString()}
            </span>
          </div>

          {removalRequest.note && (
            <div className="text-sm text-smoke-600 dark:text-smoke-400 bg-smoke-50 dark:bg-smoke-900 p-3 rounded-lg">
              <span className="font-medium text-smoke-900 dark:text-smoke-100">
                Reason:
              </span>
              <span className="ml-2">"{removalRequest.note}"</span>
            </div>
          )}
        </div>

        {/* Decision Information */}
        {removalRequest.decidedBy && removalRequest.decidedAt && (
          <div className="bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-4 flex flex-col">
            <SectionHeader icon={IconCertificate}>
              Decision Information
            </SectionHeader>

            <div className="flex items-center gap-2 text-sm text-smoke-700 dark:text-smoke-300">
              {removalRequest.decidedBy.avatar ? (
                <img
                  src={
                    import.meta.env.VITE_API_URL +
                    removalRequest.decidedBy.avatar
                  }
                  alt="Avatar"
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <IconUser size={16} />
              )}
              <span className="font-medium text-smoke-900 dark:text-smoke-100">
                {removalRequest.decidedBy.name}
              </span>
              <span>
                {removalRequest.status === 1 ? "approved" : "rejected"} this
                request on
              </span>
              <span className="font-medium">
                {new Date(removalRequest.decidedAt).toLocaleDateString()}
              </span>
            </div>

            {removalRequest.decisionNote && (
              <div className="text-sm text-smoke-600 dark:text-smoke-400 bg-smoke-50 dark:bg-smoke-900 p-3 rounded-lg">
                <span className="font-medium text-smoke-900 dark:text-smoke-100">
                  Decision Note:
                </span>
                <span className="ml-2">"{removalRequest.decisionNote}"</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {isPending && (
          <div className="grid grid-cols-2 gap-2">
            <HoldButton
              color="success"
              onClick={handleApproveConfirmed}
              disabled={actionLoading !== null}
              confirmTitle="Approve Removal Request"
              confirmMessage="Are you sure you want to approve this removal request? This action will permanently delete the post."
              confirmActionText="Approve"
              className="flex-1"
            >
              Approve
            </HoldButton>

            <HoldButton
              color="danger"
              onClick={handleRejectConfirmed}
              disabled={actionLoading !== null}
              confirmTitle="Reject Removal Request"
              confirmMessage="Are you sure you want to reject this removal request?"
              confirmActionText="Reject"
              className="flex-1"
            >
              Reject
            </HoldButton>
          </div>
        )}

        {/* Decision Note Dialog */}
        <Dialog
          isOpen={showDecisionNoteDialog !== null}
          onClose={() => {
            setShowDecisionNoteDialog(null);
            setDecisionNote("");
          }}
          title={`${showDecisionNoteDialog === "approve" ? "Approve" : "Reject"} Removal Request`}
          actions={[
            {
              children: "Cancel",
              variant: "outlined",
              onClick: () => {
                setShowDecisionNoteDialog(null);
                setDecisionNote("");
              },
              disabled: actionLoading !== null,
            },
            {
              children: actionLoading !== null
                ? (showDecisionNoteDialog === "approve" ? "Approving..." : "Rejecting...")
                : (showDecisionNoteDialog === "approve" ? "Approve" : "Reject"),
              color: showDecisionNoteDialog === "approve" ? "success" : "danger",
              onClick: showDecisionNoteDialog === "approve" ? handleApprove : handleReject,
              disabled: actionLoading !== null || decisionNote.trim() === "",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2">
                Decision Note
              </label>
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                placeholder="Explain your decision..."
                className="w-full px-3 py-2 border border-smoke-300 dark:border-smoke-700 rounded-lg bg-white dark:bg-smoke-900 text-smoke-900 dark:text-smoke-100 placeholder-smoke-400 dark:placeholder-smoke-500 focus:ring-2 focus:ring-gopher-500 focus:border-transparent resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-xs text-smoke-500 dark:text-smoke-400 mt-1">
                {decisionNote.length}/500 characters
              </div>
            </div>
          </div>
        </Dialog>
      </Container>
    </RouteGuard>
  );
};

export default RemovalRequestDetailsPage;
