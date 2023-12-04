import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./profile";

type ReducedUserState = Omit<UserState, "posts">;

const initialState: ReducedUserState = {
  id: "",
  username: "",
  email: "",
  bio: null,
  coverImage: null,
  profileImage: null,
  hasNotification: null,
  createdAt: "",
  updatedAt: "",
  followingIds: [],
  followerIds: [],
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    onMeSave: (state, action) => {
      return action.payload;
    },
    onMeRemove: () => {
      return initialState;
    },
  },
});

export const { onMeSave, onMeRemove } = meSlice.actions;

export default meSlice.reducer;
