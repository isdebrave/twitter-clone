import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

const initialState: PostState[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    onPostsSave: (state, action) => {
      state.push(...action.payload);
    },
    onAddPostToPosts: (state, action) => {
      console.log(action.payload);
      state.unshift(action.payload);
    },
  },
});

export const { onPostsSave, onAddPostToPosts } = postsSlice.actions;

export default postsSlice.reducer;
