import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

export const getAuditLogs = async (filters: AuditLogFilters = {}) => {
  const queryString = QueryString.stringify(filters, {
    addQueryPrefix: true,
    arrayFormat: 'comma'
  });
  return ApiCall.get<AuditLogsResponse>(`/audit-logs${queryString}`);
};

export const getAuditLogsByEntity = async (
  entityType: string,
  entityId: number,
  filters: AuditLogFilters = {}
) => {
  const queryString = QueryString.stringify(filters, { addQueryPrefix: true });
  return ApiCall.get<AuditLogsResponse>(
    `/audit-logs/entity/${entityType}/${entityId}${queryString}`
  );
};

export const getAuditLogsByUser = async (
  userId: number,
  filters: AuditLogFilters = {}
) => {
  const queryString = QueryString.stringify(filters, { addQueryPrefix: true });
  return ApiCall.get<AuditLogsResponse>(`/audit-logs/user/${userId}${queryString}`);
};
