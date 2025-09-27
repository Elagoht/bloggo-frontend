import { FC } from "react";
import AuditLogList from "./AuditLogList";

type AuditLogTableProps = {
  auditLogs: AuditLog[];
  users: Map<number, UserCard>;
};

const AuditLogTable: FC<AuditLogTableProps> = ({ auditLogs, users }) => {

  return (
    <AuditLogList auditLogs={auditLogs} users={users} />
  );
};

export default AuditLogTable;
