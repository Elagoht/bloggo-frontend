import { create } from "zustand";

interface ProfileStore {
  profile: UserDetails | null;
  setProfile: (profile: UserDetails | null) => void;
  updateProfile: (updates: Partial<UserDetails>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,

  setProfile: (profile: UserDetails | null) => {
    set({ profile });
  },

  updateProfile: (updates: Partial<UserDetails>) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }));
  },
}));
