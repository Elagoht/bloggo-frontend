import { create } from 'zustand';

interface ProfileStore {
  profile: ResponseUser | null;
  setProfile: (profile: ResponseUser | null) => void;
  updateProfile: (updates: Partial<ResponseUser>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  
  setProfile: (profile: ResponseUser | null) => {
    set({ profile });
  },
  
  updateProfile: (updates: Partial<ResponseUser>) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }));
  },
}));
