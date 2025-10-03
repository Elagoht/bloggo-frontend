import {
  IconActivity,
  IconCategory,
  IconCheck,
  IconClock,
  IconEdit,
  IconFileText,
  IconPlus,
  IconSettings,
  IconTag,
  IconTrash,
  IconUser,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import Calendar from "../../../../utilities/Calendar";

type AuditLogListItemProps = {
  auditLog: AuditLog;
  users: Map<number, UserCard>;
};

const AuditLogListItem: FC<AuditLogListItemProps> = ({ auditLog, users }) => {
  const getUserName = (userId: number | null) => {
    if (!userId) return "System";
    const user = users.get(userId);
    if (user) {
      return (
        <Link
          to={`/users/details/${userId}`}
          className="text-gopher-600 dark:text-gopher-400 hover:underline"
        >
          {user.name}
        </Link>
      );
    }
    return `User #${userId}`;
  };

  const ActionIcon = getActionIcon(auditLog.action, auditLog.entityType);

  const renderSentence = () => {
    const user = getUserName(auditLog.userId);
    const entityType = formatEntityType(auditLog.entityType).toLowerCase();

    // Handle special action formatting
    let action: string;
    if (auditLog.action === "login") {
      action = "logged in";
    } else if (auditLog.action === "logout") {
      action = "logged out";
    } else if (auditLog.action === "config_updated") {
      action = "updated webhook configuration";
    } else if (auditLog.action === "headers_updated") {
      action = "updated webhook headers";
    } else if (auditLog.action === "manual_fire") {
      action = "manually fired webhook";
    } else if (auditLog.entityType === "keyvalue" && auditLog.action === "updated") {
      action = "updated system configuration";
    } else {
      action = formatAction(auditLog.action).toLowerCase();
    }

    // For auth, webhook, and keyvalue actions, don't show entity display
    const entityDisplay =
      auditLog.entityType === "auth" || auditLog.entityType === "webhook" || auditLog.entityType === "keyvalue"
        ? ""
        : auditLog.entityName
        ? `${entityType} "${auditLog.entityName}"`
        : `${entityType} #${auditLog.entityId}`;

    return (
      <span className="grow">
        <span>{user}</span>{" "}
        <strong className={getActionColor(auditLog.action)}>{action}</strong>{" "}
        {entityDisplay}
      </span>
    );
  };

  return (
    <li
      className={classNames(
        "rounded-lg text-sm border overflow-hidden flex items-center py-1 px-2 gap-2",
        getActionBgColor(auditLog.action)
      )}
    >
      <ActionIcon
        className={classNames(
          "size-4 shrink-0",
          getIconBgColor(auditLog.action)
        )}
      />

      <div className="flex gap-x-2 flex-wrap">
        {renderSentence()}

        <time
          className={classNames("shrink-0", getIconBgColor(auditLog.action))}
        >
          @{Calendar.formatDate(auditLog.createdAt)}
        </time>
      </div>
    </li>
  );
};

export default AuditLogListItem;

const formatAction = (action: string) => {
  // Actions are now simple verbs, just capitalize
  return action.charAt(0).toUpperCase() + action.slice(1);
};

const formatEntityType = (entityType: string) => {
  return entityType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getActionColor = (action: string) => {
  // Each action gets a unique color
  if (action === "created") return "text-emerald-600 dark:text-emerald-400";
  if (action === "added") return "text-green-600 dark:text-green-400";
  if (action === "approved") return "text-teal-600 dark:text-teal-400";
  if (action === "published") return "text-lime-600 dark:text-lime-400";

  if (action === "updated") return "text-blue-600 dark:text-blue-400";
  if (action === "assigned") return "text-indigo-600 dark:text-indigo-400";

  if (action === "submitted") return "text-amber-600 dark:text-amber-400";
  if (action === "requested") return "text-yellow-600 dark:text-yellow-400";

  if (action === "deleted") return "text-red-600 dark:text-red-400";
  if (action === "removed") return "text-rose-600 dark:text-rose-400";
  if (action === "rejected") return "text-pink-600 dark:text-pink-400";
  if (action === "denied") return "text-fuchsia-600 dark:text-fuchsia-400";
  if (action === "unpublished") return "text-orange-600 dark:text-orange-400";

  if (action === "login") return "text-cyan-600 dark:text-cyan-400";
  if (action === "logout") return "text-slate-600 dark:text-slate-400";

  if (action === "duplicated_from")
    return "text-purple-600 dark:text-purple-400";
  if (action === "replaced_published")
    return "text-violet-600 dark:text-violet-400";

  // Webhook actions
  if (action === "config_updated") return "text-sky-600 dark:text-sky-400";
  if (action === "headers_updated") return "text-sky-600 dark:text-sky-400";
  if (action === "manual_fire") return "text-sky-600 dark:text-sky-400";

  return "text-smoke-900 dark:text-white";
};

const getActionIcon = (action: string, entityType: string) => {
  // Entity type based icons
  if (entityType === "auth") return IconUser; // Auth actions like login/logout
  if (entityType === "webhook") return IconWebhook; // Webhook actions
  if (entityType === "keyvalue") return IconSettings; // Key-value configuration
  if (entityType === "user") return IconUser;
  if (entityType === "post" || entityType === "post_version")
    return IconFileText;
  if (entityType === "category") return IconCategory;
  if (entityType === "tag") return IconTag;

  // Action based icons
  if (action.includes("created")) return IconPlus;
  if (action.includes("deleted")) return IconTrash;
  if (action.includes("updated")) return IconEdit;
  if (action.includes("approved")) return IconCheck;
  if (action.includes("rejected") || action.includes("denied")) return IconX;
  if (action.includes("submitted") || action.includes("requested"))
    return IconClock;

  return IconActivity;
};

const getActionBgColor = (action: string) => {
  // Each action gets a unique color
  if (action === "created")
    return "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800";
  if (action === "added")
    return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
  if (action === "approved")
    return "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800";
  if (action === "published")
    return "bg-lime-50 dark:bg-lime-950 border-lime-200 dark:border-lime-800";

  if (action === "updated")
    return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
  if (action === "assigned")
    return "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800";

  if (action === "submitted")
    return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
  if (action === "requested")
    return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800";

  if (action === "deleted")
    return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
  if (action === "removed")
    return "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800";
  if (action === "rejected")
    return "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800";
  if (action === "denied")
    return "bg-fuchsia-50 dark:bg-fuchsia-950 border-fuchsia-200 dark:border-fuchsia-800";
  if (action === "unpublished")
    return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";

  if (action === "login")
    return "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800";
  if (action === "logout")
    return "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800";

  if (action === "duplicated_from")
    return "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800";
  if (action === "replaced_published")
    return "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800";

  // Webhook actions
  if (action === "config_updated")
    return "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800";
  if (action === "headers_updated")
    return "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800";
  if (action === "manual_fire")
    return "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800";

  return "bg-white dark:bg-smoke-950 border-smoke-200 dark:border-smoke-800";
};

const getIconBgColor = (action: string) => {
  // Icon background colors that match the action colors
  if (action === "created") return "text-emerald-500 dark:text-emerald-600";
  if (action === "added") return "text-green-500 dark:text-green-600";
  if (action === "approved") return "text-teal-500 dark:text-teal-600";
  if (action === "published") return "text-lime-500 dark:text-lime-600";

  if (action === "updated") return "text-blue-500 dark:text-blue-600";
  if (action === "assigned") return "text-indigo-500 dark:text-indigo-600";

  if (action === "submitted") return "text-amber-500 dark:text-amber-600";
  if (action === "requested") return "text-yellow-500 dark:text-yellow-600";

  if (action === "deleted") return "text-red-500 dark:text-red-600";
  if (action === "removed") return "text-rose-500 dark:text-rose-600";
  if (action === "rejected") return "text-pink-500 dark:text-pink-600";
  if (action === "denied") return "text-fuchsia-500 dark:text-fuchsia-600";
  if (action === "unpublished") return "text-orange-500 dark:text-orange-600";

  if (action === "login") return "text-cyan-500 dark:text-cyan-600";
  if (action === "logout") return "text-slate-500 dark:text-slate-600";

  if (action === "duplicated_from")
    return "text-purple-500 dark:text-purple-600";
  if (action === "replaced_published")
    return "text-violet-500 dark:text-violet-600";

  // Webhook actions
  if (action === "config_updated") return "text-sky-500 dark:text-sky-600";
  if (action === "headers_updated") return "text-sky-500 dark:text-sky-600";
  if (action === "manual_fire") return "text-sky-500 dark:text-sky-600";

  return "text-smoke-500 dark:text-smoke-600";
};
