type AuditLog = {
  id: number;
  userId: number | null;
  entity: string;
  entityId: number;
  action: string;
  createdAt: string;
};

type AuditLogsResponse = {
  data: AuditLog[];
  page: number;
  take: number;
  total: number;
};
