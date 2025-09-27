import { FC, useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Calendar from "../../../../utilities/Calendar";

type AuditLogItemProps = {
  auditLog: AuditLog;
  users: Map<number, UserCard>;
};

const AuditLogItem: FC<AuditLogItemProps> = ({ auditLog, users }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const hasDetails = auditLog.oldValues || auditLog.newValues || auditLog.metadata;

  return (
    <>
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
          #{auditLog.entityId}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-100">
          {hasDetails && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center text-gopher-600 hover:text-gopher-700 dark:text-gopher-400 dark:hover:text-gopher-300"
            >
              {showDetails ? (
                <IconChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <IconChevronRight className="w-4 h-4 mr-1" />
              )}
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
            </button>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-500 dark:text-smoke-200">
          {Calendar.formatDate(auditLog.createdAt)}
        </td>
      </tr>

      {showDetails && hasDetails && (
        <tr className="bg-smoke-50 dark:bg-smoke-950">
          <td colSpan={6} className="px-6 py-4">
            <div className="space-y-3">
              {auditLog.oldValues && (
                <div>
                  <h4 className="text-sm font-medium text-smoke-900 dark:text-white mb-2">
                    Previous Values:
                  </h4>
                  <pre className="text-xs bg-smoke-100 dark:bg-black text-smoke-800 dark:text-smoke-100 p-3 rounded border border-smoke-200 dark:border-smoke-700 overflow-x-auto">
                    {JSON.stringify(auditLog.oldValues, null, 2)}
                  </pre>
                </div>
              )}

              {auditLog.newValues && (
                <div>
                  <h4 className="text-sm font-medium text-smoke-900 dark:text-white mb-2">
                    New Values:
                  </h4>
                  <pre className="text-xs bg-smoke-100 dark:bg-black text-smoke-800 dark:text-smoke-100 p-3 rounded border border-smoke-200 dark:border-smoke-700 overflow-x-auto">
                    {JSON.stringify(auditLog.newValues, null, 2)}
                  </pre>
                </div>
              )}

              {auditLog.metadata && (
                <div>
                  <h4 className="text-sm font-medium text-smoke-900 dark:text-white mb-2">
                    Metadata:
                  </h4>
                  <pre className="text-xs bg-smoke-100 dark:bg-black text-smoke-800 dark:text-smoke-100 p-3 rounded border border-smoke-200 dark:border-smoke-700 overflow-x-auto">
                    {JSON.stringify(auditLog.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default AuditLogItem;
