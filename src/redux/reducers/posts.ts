import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";
import { fetchPosts } from "../thunk/posts";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return { isUpdatedOnce: true, value: action.payload };
    });
  },
});

export default postsSlice.reducer;
