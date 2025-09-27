import { FC } from "react";
import AuditLogListItem from "./AuditLogListItem";

type AuditLogListProps = {
  auditLogs: AuditLog[];
  users: Map<number, UserCard>;
};

const AuditLogList: FC<AuditLogListProps> = ({ auditLogs, users }) => {
  return (
    <div className="space-y-1">
      {auditLogs.map((log) => (
        <AuditLogListItem
          key={log.id}
          auditLog={log}
          users={users}
        />
      ))}
    </div>
  );
};

export default AuditLogList;