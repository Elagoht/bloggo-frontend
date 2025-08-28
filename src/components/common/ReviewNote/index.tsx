import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

type ReviewNoteProps = {
  status: number;
  note: string | null;
  changedBy: {
    id: number;
    name: string;
    avatar?: string;
  } | null;
  changedAt: string | null;
};

const ReviewNote: FC<ReviewNoteProps> = ({
  status,
  note,
  changedBy,
  changedAt,
}) => {
  // Only show review note for approved/rejected/published statuses that have a note
  if ((status !== 2 && status !== 3 && status !== 5) || !note) {
    return null;
  }

  const isApproved = status === 2 || status === 5; // Approved or Published
  const isRejected = status === 3;

  const getIcon = () => {
    if (isApproved) return IconCheck;
    if (isRejected) return IconX;
    return IconInfoCircle;
  };

  const getColorClasses = () => {
    if (isApproved) {
      return {
        container:
          "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        icon: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
        title: "text-green-900 dark:text-green-100",
        text: "text-green-700 dark:text-green-300",
      };
    }
    if (isRejected) {
      return {
        container:
          "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        icon: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900",
        title: "text-red-900 dark:text-red-100",
        text: "text-red-700 dark:text-red-300",
      };
    }
    return {
      container:
        "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900",
      title: "text-blue-900 dark:text-blue-100",
      text: "text-blue-700 dark:text-blue-300",
    };
  };

  const colors = getColorClasses();
  const IconComponent = getIcon();
  const title = isApproved ? "Approval Note" : "Rejection Reason";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(navigator.language, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 border rounded-lg ${colors.container}`}
    >
      <span className={classNames("flex-shrink-0 p-1 rounded", colors.icon)}>
        <IconComponent size={16} />
      </span>

      <div className="flex-1">
        <h4 className={classNames("text-sm font-medium mb-1", colors.title)}>
          {title}
        </h4>

        <p className={classNames("text-sm leading-relaxed mb-2", colors.text)}>
          {note}
        </p>
        {changedBy && changedAt && (
          <p className={`text-xs opacity-75 ${colors.text}`}>
            By{" "}
            <Link
              to={`/users/details/${changedBy.id}`}
              className="hover:underline"
            >
              {changedBy.name}
            </Link>{" "}
            on {formatDate(changedAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewNote;
