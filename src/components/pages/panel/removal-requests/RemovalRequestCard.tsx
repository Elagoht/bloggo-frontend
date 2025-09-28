import { IconCalendar, IconUser, IconClock, IconCheck, IconX } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { REMOVAL_REQUEST_STATUS } from "../../../../services/removal-requests";

const RemovalRequestCard: FC<RemovalRequestCard> = ({
  id,
  postTitle,
  requestedBy,
  note,
  status,
  decidedBy,
  decisionNote,
  decidedAt,
  createdAt,
}) => {
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

  const statusText = getStatusText(status);
  const statusColor = getStatusColor(status);
  const StatusIcon = getStatusIcon(status);

  return (
    <Link
      to={`/removal-requests/details/${id}`}
      className="block p-4 bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 hover:border-gopher-200 dark:hover:border-gopher-800 transition-colors duration-200"
    >
      {/* Title - Full width */}
      <h3 className="font-medium text-smoke-900 dark:text-smoke-100 mb-3 line-clamp-2">
        {postTitle}
      </h3>

      {/* Status and Time - Justified between */}
      <div className="flex items-center justify-between mb-3">
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

        <div className="flex items-center gap-1 text-sm text-smoke-600 dark:text-smoke-400">
          <IconCalendar size={16} />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Requester and Note */}
      <div className="mb-3">
        <div className="flex items-center gap-2 text-sm text-smoke-700 dark:text-smoke-300 mb-2">
          {requestedBy.avatar ? (
            <img
              src={import.meta.env.VITE_API_URL + requestedBy.avatar}
              alt="Avatar"
              className="w-4 h-4 rounded-full"
            />
          ) : (
            <IconUser size={16} />
          )}
          <span className="font-medium">{requestedBy.name}</span>
          <span className="text-smoke-500 dark:text-smoke-500">requested removal</span>
        </div>
        {note && (
          <p className="text-sm text-smoke-600 dark:text-smoke-400 line-clamp-2 ml-6">
            "{note}"
          </p>
        )}
      </div>

      {/* Decision maker and Note (if available) */}
      {decidedBy && decidedAt && (
        <div>
          <div className="flex items-center gap-2 text-sm text-smoke-700 dark:text-smoke-300 mb-2">
            {decidedBy.avatar ? (
              <img
                src={import.meta.env.VITE_API_URL + decidedBy.avatar}
                alt="Avatar"
                className="w-4 h-4 rounded-full"
              />
            ) : (
              <IconUser size={16} />
            )}
            <span className="font-medium">{decidedBy.name}</span>
            <span className="text-smoke-500 dark:text-smoke-500">
              {status === REMOVAL_REQUEST_STATUS.APPROVED ? "approved" : "rejected"}
            </span>
          </div>
          {decisionNote && (
            <p className="text-sm text-smoke-600 dark:text-smoke-400 line-clamp-2 ml-6">
              "{decisionNote}"
            </p>
          )}
        </div>
      )}
    </Link>
  );
};

export default RemovalRequestCard;
