import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

export const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    onPostModalOpen: (state) => {
      state.isOpen = true;
    },
    onPostModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onPostModalOpen, onPostModalClose } = postModalSlice.actions;

export default postModalSlice.reducer;
