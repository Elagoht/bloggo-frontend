type Permission =
  | "post:create"
  | "post:delete"
  | "post:publish"
  | "post:view"
  | "post:list"
  | "tag:list"
  | "tag:view"
  | "tag:create"
  | "tag:update"
  | "tag:delete"
  | "tag:assign"
  | "category:list"
  | "category:view"
  | "category:create"
  | "category:update"
  | "category:delete"
  | "user:list"
  | "user:view"
  | "user:register"
  | "user:update"
  | "user:delete"
  | "user:change_passphrase"
  | "user:assign_role"
  | "statistics:view-total"
  | "statistics:view-others"
  | "statistics:view-self"
  | "auditlog:view"
  | "apidoc:view"
  | "keyvalue:manage";

type RoutePermissionConfig = {
  path: string;
  permission?: Permission | Permission[];
  role?: string | string[];
  requireAll?: boolean;
  redirectTo?: string;
};
