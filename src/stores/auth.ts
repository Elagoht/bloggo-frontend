import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import ApiCall from "../utilities/apiCaller";

interface AuthState {
  accessToken: string | null;
  name: string | null;
  role: string | null;
  permissions: string[];
}

interface AuthStore extends AuthState {
  setAuth: (auth: AuthState) => void;
  clearAuth: () => void;
  setToken: (token: string) => void;
  setUser: (user: {
    name: string;
    role: string;
    permissions: string[];
  }) => void;
  hasPermission: (permission: string | string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  hasRole: (role: string | string[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    devtools(
      (set, get) => ({
        accessToken: null,
        name: null,
        role: null,
        permissions: [],

        setAuth: (auth: AuthState) => {
          ApiCall.setAuthToken(auth.accessToken);
          set(auth);
        },

        clearAuth: () => {
          ApiCall.setAuthToken(null);
          set({
            accessToken: null,
            name: null,
            role: null,
            permissions: [],
          });
        },

        setToken: (token: string) => {
          ApiCall.setAuthToken(token);
          set({ accessToken: token });
        },

        setUser: (user: {
          name: string;
          role: string;
          permissions: string[];
        }) => {
          set({
            name: user.name,
            role: user.role,
            permissions: user.permissions,
          });
        },

        hasPermission: (permission: string | string[]) => {
          const state = get();
          const userPermissions = state.permissions || [];

          if (Array.isArray(permission)) {
            return permission.some((p) => userPermissions.includes(p));
          }
          return userPermissions.includes(permission);
        },

        hasAllPermissions: (permissions: string[]) => {
          const state = get();
          const userPermissions = state.permissions || [];
          return permissions.every((p) => userPermissions.includes(p));
        },

        hasRole: (role: string | string[]) => {
          const state = get();
          const userRole = state.role;

          if (!userRole) return false;

          if (Array.isArray(role)) {
            return role.includes(userRole);
          }
          return userRole === role;
        },
      }),
      {
        name: "auth-store",
      }
    ),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        name: state.name,
        role: state.role,
        permissions: state.permissions,
      }),
    }
  )
);
