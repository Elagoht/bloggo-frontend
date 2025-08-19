export type Permission =
  | "post:create"
  | "post:edit"
  | "post:edit_own"
  | "post:delete"
  | "post:delete_own"
  | "post:publish"
  | "post:view"
  | "post:schedule"
  | "tag:manage"
  | "category:manage"
  | "user:view"
  | "user:create"
  | "user:update"
  | "user:delete"
  | "user:assign_role"
  | "user:change_passphrase"
  | "user:manage_self_avatar"
  | "statistics:view-all"
  | "statistics:view-self"
  | "role:assign"
  | "auditlog:view"
  | "schedule:create"
  | "schedule:update"
  | "schedule:delete"
  | "schedule:view";

export function hasPermission(
  userPermissions: string[],
  requiredPermission: Permission | Permission[]
): boolean {
  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some((permission) =>
      userPermissions.includes(permission)
    );
  }
  return userPermissions.includes(requiredPermission);
}

export function hasAllPermissions(
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
}

export function checkPermission(
  userPermissions: string[],
  requiredPermission: Permission | Permission[]
): boolean {
  return hasPermission(userPermissions, requiredPermission);
}
