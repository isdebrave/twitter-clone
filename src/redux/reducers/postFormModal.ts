import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

export const postFormModalSlice = createSlice({
  name: "postFormModal",
  initialState,
  reducers: {
    onPostFormModalOpen: (state) => {
      state.isOpen = true;
    },
    onPostFormModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onPostFormModalOpen, onPostFormModalClose } =
  postFormModalSlice.actions;

export default postFormModalSlice.reducer;
