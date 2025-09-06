import { FC } from "react";
import AuditLogTableHeader from "./AuditLogTableHeader";
import AuditLogItem from "./AuditLogItem";

type AuditLog = {
  id: number;
  userId: number | null;
  action: string;
  entity: string;
  entityId: number;
  createdAt: string;
};

type AuditLogTableProps = {
  auditLogs: AuditLog[];
  users: Map<number, any>;
};

const AuditLogTable: FC<AuditLogTableProps> = ({ auditLogs, users }) => {
  const columns = [
    { key: "user", label: "User" },
    { key: "action", label: "Action" },
    { key: "entity", label: "Entity" },
    { key: "entityId", label: "Entity ID" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <AuditLogTableHeader columns={columns} />
          <tbody className="divide-y divide-smoke-200 dark:divide-smoke-700">
            {auditLogs.map((log) => (
              <AuditLogItem key={log.id} auditLog={log} users={users} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogTable;
