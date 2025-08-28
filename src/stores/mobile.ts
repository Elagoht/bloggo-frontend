import { create } from "zustand";

interface MobileStore {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

export const useMobileStore = create<MobileStore>((set) => ({
  isMobileMenuOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
}));
