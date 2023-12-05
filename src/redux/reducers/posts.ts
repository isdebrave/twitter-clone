import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";
import axios from "axios";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {
    const response = await axios.get("/post");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

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
