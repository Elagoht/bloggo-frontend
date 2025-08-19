import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Permission } from "../../utilities/permissions";

interface PermissionGuardProps {
  permission?: Permission | Permission[];
  role?: string | string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function PermissionGuard({
  permission,
  role,
  requireAll = false,
  fallback = null,
  children
}: PermissionGuardProps) {
  const { hasPermission, hasAllPermissions, hasRole } = useAuth();

  const hasAccess = () => {
    if (role) {
      if (!hasRole(role)) {
        return false;
      }
    }

    if (permission) {
      if (requireAll && Array.isArray(permission)) {
        return hasAllPermissions(permission);
      }
      return hasPermission(permission);
    }

    if (role) {
      return hasRole(role);
    }

    return false;
  };

  if (!hasAccess()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}