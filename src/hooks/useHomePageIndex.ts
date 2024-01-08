import { create } from "zustand";

interface HomePageIndexStore {
  page: number;
  onPlus: () => void;
  onReset: () => void;
}

const useHomePageIndex = create<HomePageIndexStore>((set) => ({
  page: 0,
  onPlus: () => set(({ page }) => ({ page: page + 1 })),
  onReset: () => set({ page: 0 }),
}));

export default useHomePageIndex;
