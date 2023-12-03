import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./posts";

interface ProfileState {
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
  posts: PostState[];
}

const initialState: ProfileState = {
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onProfileSave: (state, action) => {
      return action.payload;
    },
    onProfileRemove: () => {
      return initialState;
    },
  },
});

export const { onProfileSave, onProfileRemove } = profileSlice.actions;

export default profileSlice.reducer;
