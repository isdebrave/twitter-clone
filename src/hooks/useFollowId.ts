import { create } from "zustand";

interface FollowIdStore {
  flag: "POST" | "DELETE" | "";
  meId: string;
  followingIds: string[];
  onFlag: (flag: "POST" | "DELETE" | "") => void;
  onMeId: (meId: string) => void;
  onAddFollowingIds: (followerId: string) => void;
  onDeleteFollowingIds: (followerId: string) => void;
  onReset: () => void;
}

const useFollowId = create<FollowIdStore>((set, get) => ({
  flag: "",
  meId: "",
  followingIds: [],
  onFlag: (flag: "POST" | "DELETE" | "") => set({ flag }),
  onMeId: (meId: string) => set({ meId }),
  onAddFollowingIds: (followerId: string) =>
    set((state) => ({
      followingIds: [followerId, ...state.followingIds],
    })),
  onDeleteFollowingIds: (followerId: string) =>
    set((state) => ({
      followingIds: state.followingIds.filter((id) => id !== followerId),
    })),
  onReset: () => set({ flag: "", meId: "", followingIds: [] }),
}));

export default useFollowId;
