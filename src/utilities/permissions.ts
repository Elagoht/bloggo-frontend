export const hasPermission = (
  userPermissions: string[],
  requiredPermission: Permission | Permission[]
): boolean => {
  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some((permission) =>
      userPermissions.includes(permission)
    );
  }
  return userPermissions.includes(requiredPermission);
};

export const hasAllPermissions = (
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

export const checkPermission = (
  userPermissions: string[],
  requiredPermission: Permission | Permission[]
): boolean => {
  return hasPermission(userPermissions, requiredPermission);
};
