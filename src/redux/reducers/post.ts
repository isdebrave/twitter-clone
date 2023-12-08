import { createSlice } from "@reduxjs/toolkit";

import { CommentsState } from "./comments";
import { ProfileState } from "./profile";
import { fetchPost, fetchPostLiked } from "../thunk/post";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(fetchPostLiked.fulfilled, (state, action) => {
      const { meId, status } = action.payload!;

      if (status === "ADD") {
        state.likedIds.push(meId);
      } else {
        state.likedIds = state.likedIds.filter((userId) => userId !== meId);
      }
    });
  },
});

export default postSlice.reducer;
