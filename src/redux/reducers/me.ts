import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./profile";

const initialState: UserState = {
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
  posts: [],
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
