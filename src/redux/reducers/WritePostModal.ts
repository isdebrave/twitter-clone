import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

export const writePostModalSlice = createSlice({
  name: "writePostModal",
  initialState,
  reducers: {
    onWritePostModalOpen: (state) => {
      state.isOpen = true;
    },
    onWritePostModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onWritePostModalOpen, onWritePostModalClose } =
  writePostModalSlice.actions;

export default writePostModalSlice.reducer;
