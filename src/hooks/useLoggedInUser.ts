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

interface LoggedInUserStore {
  value: LoggedInUserProps | null;
  onLoggedIn: (data: LoggedInUserProps) => void;
}

const useLoggedInUser = create<LoggedInUserStore>((set) => ({
  value: null,
  onLoggedIn: (data) => set({ value: data }),
}));

export default useLoggedInUser;
