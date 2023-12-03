import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
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
  followerIds: string[];
}

const initialState: UserState[] = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    onUsersSave: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { onUsersSave } = usersSlice.actions;

export default usersSlice.reducer;
