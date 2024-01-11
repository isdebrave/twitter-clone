import { create } from "zustand";

interface WritePostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWritePostModal = create<WritePostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useWritePostModal;
