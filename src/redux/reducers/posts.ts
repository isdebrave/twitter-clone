import { createSlice } from "@reduxjs/toolkit";

import { CommentsState } from "./comments";
import { UserState } from "./users";

export interface PostState {
  id: string;
  body: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  likedIds: string[];
  user: UserState;
  comments: CommentsState[];
}

const initialState: PostState[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    onPostsSave: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { onPostsSave } = postsSlice.actions;

export default postsSlice.reducer;
