import { create } from "zustand";

export interface UserProps {
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

interface UsersStore {
  value: UserProps[] | null;
  onValue: (data: UserProps[]) => void;
}

const useUsers = create<UsersStore>((set) => ({
  value: null,
  onValue: (data) => set({ value: data }),
}));

export default useUsers;
