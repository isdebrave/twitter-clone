import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

const initialState: PostState[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    onPosts: (state, action) => {
      return [...state, ...action.payload];
    },
    onPostsAdd: (state, action) => {
      const { options, data } = action.payload;

      if (!data) {
        state.unshift(options);
      } else {
        state[0] = data;
      }
    },
    onPostsLiked: (state, action) => {
      const { isExists, userId, postId } = action.payload;

      const post = state.find((post) => post.id === postId);
      if (!post) return;

      if (!isExists) {
        post.likedIds.push(userId);
      } else {
        post.likedIds = post.likedIds.filter((id) => id !== userId);
      }
    },
    onPostsProfileUpdate: (state, action) => {
      const { profileImage, userId } = action.payload;

      for (const post of state) {
        if (post.user.id === userId) {
          post.user.profileImage = profileImage;
        }
      }
    },
    onPostsDelete: (state, action) => {
      const { postId } = action.payload;

      return state.filter((post) => post.id !== postId);
    },
    onPostsCommentAdd: (state, action) => {
      const { options, data } = action.payload;

      if (!data) {
        const { postId } = options;

        const post = state.find((post) => post.id === postId);

        if (!post) return;

        post.comments.unshift(options);
        post.totalCommentsCount++;
      } else {
        const { postId } = data;

        const post = state.find((post) => post.id === postId);

        if (!post) return;

        post.comments[0] = data;
      }
    },
    onPostsCommentDelete: (state, action) => {
      const { postId, commentId } = action.payload;

      const post = state.find((post) => post.id === postId);

      if (!post) return;

      post.comments = post.comments.filter(
        (comment) => comment.id !== commentId
      );
      post.totalCommentsCount--;
    },
  },
});

export const {
  onPosts,
  onPostsAdd,
  onPostsLiked,
  onPostsProfileUpdate,
  onPostsDelete,
  onPostsCommentAdd,
  onPostsCommentDelete,
} = postsSlice.actions;

export default postsSlice.reducer;
