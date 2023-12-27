import { createSlice } from "@reduxjs/toolkit";

import { CommentState } from "./comments";
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
  comments: CommentState[];
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
    onPostProfileUpdate: (state, action) => {
      const { profileImage } = action.payload;

      state.user.profileImage = profileImage;
    },
    onPostCommentAdd: (state, action) => {
      state.comments.unshift(action.payload);
    },
    onPostCommentDelete: (state, action) => {
      const { commentId } = action.payload;

      state.comments = state.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const {
  onPost,
  onPostLiked,
  onPostViews,
  onPostProfileUpdate,
  onPostCommentAdd,
  onPostCommentDelete,
} = postSlice.actions;

export default postSlice.reducer;
