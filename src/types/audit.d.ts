type AuditLog = {
  id: number;
  userId: number | null;
  userName?: string | null;
  entityType: string;
  entityId: number;
  entityName?: string | null;
  action: string;
  metadata?: Record<string, any> | null;
  createdAt: string;
};

type AuditLogsResponse = {
  logs: AuditLog[];
  total: number;
};

type AuditLogFilters = {
  page?: number;
  take?: number;
  order?: string;
  dir?: string;
  userId?: number | number[];
  entityType?: string | string[];
  action?: string | string[];
  excludeActions?: string[];
};

// Action constants for filtering
type AuditActionType =
  | "created" | "updated" | "deleted" | "login" | "logout"
  | "submitted" | "approved" | "rejected" | "published" | "unpublished"
  | "assigned" | "removed" | "requested" | "denied" | "added"
  | "duplicated_from" | "replaced_published"
  | "config_updated" | "headers_updated" | "manual_fire";

type AuditEntityType = "user" | "post" | "post_version" | "category" | "tag" | "removal_request" | "auth" | "webhook" | "keyvalue";
