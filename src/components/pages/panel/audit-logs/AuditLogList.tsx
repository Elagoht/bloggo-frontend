import { FC } from "react";
import AuditLogListItem from "./AuditLogListItem";

type AuditLogListProps = {
  auditLogs: AuditLog[];
  users: Map<number, UserCard>;
};

const AuditLogList: FC<AuditLogListProps> = ({ auditLogs, users }) => {
  return (
    <ul className="grid gap-2">
      {auditLogs.map((log) => (
        <AuditLogListItem key={log.id} auditLog={log} users={users} />
      ))}
    </ul>
  );
};

export default AuditLogList;
