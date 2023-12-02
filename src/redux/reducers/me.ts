import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./posts";

interface MeState {
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
  posts: PostState[];
}

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
