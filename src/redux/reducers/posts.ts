import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

interface PostsState {
  isUpdatedOnce: boolean;
  value: PostState[];
}

const initialState: PostsState = {
  isUpdatedOnce: false,
  value: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    onPostsSave: (state, action) => {
      return { isUpdatedOnce: true, value: action.payload };
    },
    onUpdatePosts: (state) => {
      state.isUpdatedOnce = false;
    },
    onAddPostToPosts: (state, action) => {
      state.value.unshift(action.payload);
    },
  },
});

export const { onPostsSave, onUpdatePosts, onAddPostToPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
