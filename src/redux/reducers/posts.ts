import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

const initialState: PostState[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    onPosts: (state, action) => {
      return action.payload;
    },
    onPostsAdd: (state, action) => {
      state.unshift(action.payload);
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
  },
});

export const { onPosts, onPostsAdd, onPostsLiked } = postsSlice.actions;

export default postsSlice.reducer;
