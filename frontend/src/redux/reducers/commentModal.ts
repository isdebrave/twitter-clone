// import { create } from "zustand";
// import { PostState } from "../redux/reducers/post";

// interface CommentModalStore {
//   isOpen: boolean;
//   post: PostState | null;
//   onOpen: () => void;
//   onClose: () => void;
//   onPost: (post: PostState) => void;
// }

// const useCommentModal = create<CommentModalStore>((set) => ({
//   isOpen: false,
//   post: null,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
//   onPost: (post: PostState) => set({ post }),
// }));

// export default useCommentModal;

import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

interface modalState {
  isOpen: boolean;
  post: PostState | null;
}

const initialState: modalState = {
  isOpen: false,
  post: null,
};

export const commentModalSlice = createSlice({
  name: "commentModal",
  initialState,
  reducers: {
    onCommentModalOpen: (state) => {
      state.isOpen = true;
    },
    onCommentModalClose: (state) => {
      state.isOpen = false;
    },
    onCommentBelongsToPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const {
  onCommentModalOpen,
  onCommentModalClose,
  onCommentBelongsToPost,
} = commentModalSlice.actions;

export default commentModalSlice.reducer;
