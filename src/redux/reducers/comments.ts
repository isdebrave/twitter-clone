import { createSlice } from "@reduxjs/toolkit";

import { ProfileState } from "./profile";

type UserState = ProfileState;

export interface CommentState {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  user: UserState;
}

const initialState: CommentState[] = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    onCommentAdd: (state, action) => {},
  },
});

export const { onCommentAdd } = commentsSlice.actions;

export default commentsSlice.reducer;
