import { create } from "zustand";
import { PostState } from "../redux/reducers/post";

interface CommentModalStore {
  isOpen: boolean;
  post: PostState | null;
  onOpen: () => void;
  onClose: () => void;
  onPost: (post: PostState) => void;
}

const useCommentModal = create<CommentModalStore>((set) => ({
  isOpen: false,
  post: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onPost: (post: PostState) => set({ post }),
}));

export default useCommentModal;
