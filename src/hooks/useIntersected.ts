import { create } from "zustand";

export interface IntersectedStore {
  active: boolean;
  lock: () => void;
  unlock: () => void;
}

const useIntersected = create<IntersectedStore>((set) => ({
  active: false,
  lock: () => set({ active: true }),
  unlock: () => set({ active: false }),
}));

export default useIntersected;
