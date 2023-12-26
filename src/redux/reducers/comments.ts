import { createSlice } from "@reduxjs/toolkit";

export interface CommentsState {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
}

const initialState: CommentsState[] = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    onCommentAdd: (state, action) => {},
  },
});

export const { onCommentAdd } = commentsSlice.actions;

export default commentsSlice.reducer;
