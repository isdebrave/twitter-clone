import { createSlice } from "@reduxjs/toolkit";

import { ProfileState } from "./profile";
import { fetchMe } from "../thunk/me";

export type MeState = Omit<ProfileState, "posts">;

const initialState: MeState = {
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
    onMeRemove: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { onMeRemove } = meSlice.actions;

export default meSlice.reducer;
