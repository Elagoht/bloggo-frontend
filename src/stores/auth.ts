import { atom } from "nanostores";

interface AuthStore {
  accessToken: string | null;
  name: string | null;
  role: string | null;
  permissions: string[];
}

export const $auth = atom<AuthStore>({
  accessToken: null,
  name: null,
  role: null,
  permissions: [],
});
