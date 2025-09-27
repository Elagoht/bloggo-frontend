import { IconCalendar, IconUser } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  getRemovalRequestStatusText,
  getRemovalRequestStatusColor,
} from "../../../../services/removal-requests";
import IconBadge from "../../../common/IconBadge";

const RemovalRequestCard: FC<RemovalRequestCard> = ({
  id,
  postVersionId,
  postTitle,
  requestedBy,
  note,
  status,
  decidedBy,
  decidedAt,
  createdAt,
}) => {
  const statusText = getRemovalRequestStatusText(status);
  const statusColor = getRemovalRequestStatusColor(status);

  return (
    <Link
      to={`/removal-requests/details/${id}`}
      className="block p-4 bg-white dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 hover:border-gopher-200 dark:hover:border-gopher-800 transition-colors duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-smoke-900 dark:text-smoke-100 truncate">
            {postTitle}
          </h3>
          {note && (
            <p className="text-sm text-smoke-600 dark:text-smoke-400 mt-1 line-clamp-2">
              {note}
            </p>
          )}
        </div>
        <IconBadge
          color={statusColor as "primary" | "success" | "warning" | "danger"}
        >
          {statusText}
        </IconBadge>
      </div>

      <div className="flex items-center gap-4 text-sm text-smoke-600 dark:text-smoke-400">
        <div className="flex items-center gap-1">
          {requestedBy.avatar ? (
            <img
              src={import.meta.env.VITE_API_URL + requestedBy.avatar}
              alt="Avatar"
              className="w-4 h-4 rounded-full"
            />
          ) : (
            <IconUser size={16} />
          )}
          <span>{requestedBy.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconCalendar size={16} />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {decidedBy && decidedAt && (
          <div className="flex items-center gap-1 text-xs">
            <span>Decided by {decidedBy.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RemovalRequestCard;