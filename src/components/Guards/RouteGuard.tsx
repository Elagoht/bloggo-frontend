import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type RouteGuardProps = PropsWithChildren & {
  permission?: Permission | Permission[];
  role?: string | string[];
  requireAll?: boolean;
  redirectTo?: string;
  fallback?: ReactNode;
};

export default function RouteGuard({
  permission,
  role,
  requireAll = false,
  redirectTo,
  fallback = null,
  children,
}: RouteGuardProps) {
  const { hasPermission, hasAllPermissions, hasRole, isAuthenticated } =
    useAuth();
  const navigate = useNavigate();

  const hasAccess = () => {
    if (!isAuthenticated()) {
      return false;
    }

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

    return isAuthenticated();
  };

  useEffect(() => {
    if (!hasAccess() && redirectTo) {
      navigate(redirectTo);
    }
  }, [hasAccess(), redirectTo, navigate]);

  if (!hasAccess()) {
    return fallback;
  }

  return children;
}
