import { FC } from "react";
import Calendar from "../../../../utilities/Calendar";

type AuditLog = {
  id: number;
  userId: number | null;
  action: string;
  entity: string;
  entityId: number;
  createdAt: string;
};

type AuditLogItemProps = {
  auditLog: AuditLog;
  users: Map<number, UserCard>;
};

const AuditLogItem: FC<AuditLogItemProps> = ({ auditLog, users }) => {
  const formatAction = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  };

  const formatEntity = (entity: string) => {
    return entity.charAt(0).toUpperCase() + entity.slice(1);
  };

  const getUserName = (userId: number | null) => {
    if (!userId) return "System";
    const user = users.get(userId);
    return user ? user.name : `User #${userId}`;
  };

  return (
    <tr className="hover:bg-smoke-50 dark:hover:bg-smoke-800/50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-smoke-900 dark:text-smoke-100">
        {getUserName(auditLog.userId)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gopher-100 dark:bg-gopher-900 text-gopher-800 dark:text-gopher-200">
          {formatAction(auditLog.action)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
        {formatEntity(auditLog.entity)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-700 dark:text-smoke-300">
        #{auditLog.entityId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-smoke-500 dark:text-smoke-400">
        {Calendar.formatDate(auditLog.createdAt)}
      </td>
    </tr>
  );
};

export default AuditLogItem;
