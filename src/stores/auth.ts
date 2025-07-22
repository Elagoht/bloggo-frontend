import { createStore } from "solid-js/store";

type UserProfile = {
  name: string;
  role: string;
};

interface AuthStore {
  accessToken: string | null;
  profile: UserProfile | null;
  permissions: string[];
}

export const [auth, setAuth] = createStore<AuthStore>({
  accessToken: null,
  profile: null,
  permissions: [],
});
