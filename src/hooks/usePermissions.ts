import { useMemo } from "react";
import { useAuthStore } from "../stores/auth";
import {
  Permission,
  hasPermission,
  hasAllPermissions,
} from "../utilities/permissions";

export function usePermissions() {
  const { permissions, role } = useAuthStore();

  const userPermissions = useMemo(() => permissions || [], [permissions]);

  const can = (requiredPermission: Permission | Permission[]) => {
    return useMemo(
      () => hasPermission(userPermissions, requiredPermission),
      [userPermissions, requiredPermission]
    );
  };

  const canAll = (requiredPermissions: Permission[]) => {
    return useMemo(
      () => hasAllPermissions(userPermissions, requiredPermissions),
      [userPermissions, requiredPermissions]
    );
  };

  const hasAnyRole = (roles: string[]) => {
    return useMemo(() => {
      return role ? roles.includes(role) : false;
    }, [role, roles]);
  };

  const isAdmin = useMemo(() => role === "admin", [role]);
  const isEditor = useMemo(() => role === "editor", [role]);
  const isAuthor = useMemo(() => role === "author", [role]);

  return {
    userPermissions,
    can,
    canAll,
    hasAnyRole,
    isAdmin,
    isEditor,
    isAuthor,
  };
}
