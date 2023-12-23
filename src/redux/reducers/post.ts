import { createSlice } from "@reduxjs/toolkit";

import { CommentsState } from "./comments";
import { ProfileState } from "./profile";

type UserState = ProfileState;

export interface PostState {
  id: string;
  body: string;
  images: string[];
  views: number;
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
  views: 0,
  createdAt: "",
  updatedAt: "",
  userId: "",
  likedIds: [],
  user: {
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
  },
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    onPost: (state, action) => {
      return action.payload;
    },
    onPostLiked: (state, action) => {
      const { isExists, userId } = action.payload;

      if (!isExists) {
        state.likedIds.push(userId);
      } else {
        state.likedIds = state.likedIds.filter((id) => id !== userId);
      }
    },
    onPostViews: (state) => {
      state.views++;
    },
  },
});

export const { onPost, onPostLiked, onPostViews } = postSlice.actions;

export default postSlice.reducer;
