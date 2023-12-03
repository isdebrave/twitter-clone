import { createSlice } from "@reduxjs/toolkit";

import { CommentsState } from "./comments";
import { UserState } from "./profile";

export interface PostState {
  id: string;
  body: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  likedIds: string[];
  user: UserState;
  comments: CommentsState[];
}

const initialState: PostState = {
  id: "",
  body: "",
  images: [],
  createdAt: "",
  updatedAt: "",
  userId: "",
  likedIds: [],
  user: {
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
  },
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    onPostSave: (state, action) => {
      return action.payload;
    },
  },
});

export const { onPostSave } = postSlice.actions;

export default postSlice.reducer;
