import { create } from "zustand";

interface CommentPageIndexStore {
  page: number;
  onPlus: () => void;
  onReset: () => void;
}

const useCommentPageIndex = create<CommentPageIndexStore>((set) => ({
  page: 0,
  onPlus: () => set(({ page }) => ({ page: page + 1 })),
  onReset: () => set({ page: 0 }),
}));

export default useCommentPageIndex;
