import { create } from "zustand";

interface ProfilePageIndexStore {
  page: number;
  onPlus: () => void;
  onReset: () => void;
}

const useProfilePageIndex = create<ProfilePageIndexStore>((set) => ({
  page: 0,
  onPlus: () => set(({ page }) => ({ page: page + 1 })),
  onReset: () => set({ page: 0 }),
}));

export default useProfilePageIndex;
