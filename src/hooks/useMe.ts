import { create } from "zustand";

interface LoggedInUserProps {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  coverImage: string | null;
  profileImage: string | null;
  hasNotification: boolean | null;
  createdAt: string;
  updatedAt: string;
  followingIds: string[];
}

interface MeStore {
  value: LoggedInUserProps | null;
  onValue: (data: LoggedInUserProps) => void;
}

const useMe = create<MeStore>((set) => ({
  value: null,
  onValue: (data) => set({ value: data }),
}));

export default useMe;
