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
  },
});

export const {
  onPosts,
  onPostsAdd,
  onPostsLiked,
  onPostsProfileUpdate,
  onPostsDelete,
} = postsSlice.actions;

export default postsSlice.reducer;
