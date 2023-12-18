import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";
import { fetchProfile, fetchUpdateProfile } from "../thunk/profile";

export interface ProfileState {
  id: string;
  username: string;
  email: string;
  bio: string;
  coverImage: string;
  profileImage: string;
  hasNotification: boolean;
  createdAt: string;
  updatedAt: string;
  followingIds: string[];
  followerIds: string[];
  posts: PostState[];
}

const initialState: ProfileState = {
  id: "",
  username: "",
  email: "",
  bio: "",
  coverImage: "",
  profileImage: "",
  hasNotification: false,
  createdAt: "",
  updatedAt: "",
  followingIds: [],
  followerIds: [],
  posts: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onProfileRemove: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, () => {});
  },
});

export const { onProfileRemove } = profileSlice.actions;

export default profileSlice.reducer;
