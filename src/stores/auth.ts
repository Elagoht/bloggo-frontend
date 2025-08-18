import { create } from 'zustand';
import ApiCall from '../utilities/apiCaller';

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
  setUser: (user: { name: string; role: string; permissions: string[] }) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
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
  
  setUser: (user: { name: string; role: string; permissions: string[] }) => {
    set({
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    });
  },
}));
