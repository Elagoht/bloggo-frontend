import { useAuthStore } from "../stores/auth";

export function useAuth() {
  const {
    accessToken,
    name,
    role,
    permissions,
    setAuth,
    clearAuth,
    setToken,
    setUser,
    hasPermission,
    hasAllPermissions,
    hasRole,
  } = useAuthStore();

  const user = () => ({
    name,
    role,
    permissions,
    accessToken,
  });

  const isAuthenticated = () => !!accessToken;
  const isAdmin = () => hasRole("Admin");
  const isEditor = () => hasRole("Editor");
  const isAuthor = () => hasRole("Author");

  return {
    user,
    isAuthenticated,
    isAdmin,
    isEditor,
    isAuthor,
    hasPermission,
    hasAllPermissions,
    hasRole,
    setAuth,
    clearAuth,
    setToken,
    setUser,
  };
}
