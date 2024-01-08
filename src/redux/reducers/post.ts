import { createSlice } from "@reduxjs/toolkit";

import { MeState } from "./me";

type PostUserState = Omit<MeState, "hasNotification" | "followingIds">;

export type PostCommentState = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  user: PostUserState;
};

export interface PostState {
  id: string;
  body: string;
  images: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likedIds: string[];
  user: PostUserState;
  comments: PostCommentState[];
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
    profileImage: "",
  },
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    onPost: (state, action) => {
      return { ...action.payload, comments: [] };
    },
    onPostComments: (state, action) => {
      state.comments.push(...action.payload);
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
      const { options, data } = action.payload;

      if (!data) {
        state.comments.unshift(options);
      } else {
        state.comments[0] = data;
      }
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
  onPostComments,
  onPostLiked,
  onPostViews,
  onPostProfileUpdate,
  onPostCommentAdd,
  onPostCommentDelete,
} = postSlice.actions;

export default postSlice.reducer;
