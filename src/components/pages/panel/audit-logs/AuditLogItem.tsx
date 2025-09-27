import { FC } from "react";
import Calendar from "../../../../utilities/Calendar";

type AuditLogItemProps = {
  auditLog: AuditLog;
  users: Map<number, UserCard>;
};

const AuditLogItem: FC<AuditLogItemProps> = ({ auditLog, users }) => {

  const formatAction = (action: string) => {
    // Convert action to readable format (e.g., "post.created" -> "Post Created")
    return action
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatEntityType = (entityType: string) => {
    // Convert entity type to readable format (e.g., "post_version" -> "Post Version")
    return entityType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getUserName = (userId: number | null) => {
    if (!userId) return "System";
    const user = users.get(userId);
    return user ? user.name : `User #${userId}`;
  };

  const getActionColor = (action: string) => {
    if (action.includes('created')) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (action.includes('deleted')) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    if (action.includes('updated') || action.includes('published')) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (action.includes('approved')) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (action.includes('rejected') || action.includes('denied')) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    if (action.includes('submitted') || action.includes('requested')) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  return (
    <tr className="hover:bg-smoke-50 dark:hover:bg-smoke-900 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-smoke-900 dark:text-white">
        {getUserName(auditLog.userId)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-100">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(auditLog.action)}`}>
          {formatAction(auditLog.action)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-100">
        {formatEntityType(auditLog.entityType)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-100">
        {auditLog.entityName || `#${auditLog.entityId}`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-500 dark:text-smoke-200">
        {Calendar.formatDate(auditLog.createdAt)}
      </td>
    </tr>
  );
};

export default AuditLogItem;
