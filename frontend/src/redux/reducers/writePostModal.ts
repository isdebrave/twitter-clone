import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const writePostModalSlice = createSlice({
  name: "writePostModal",
  initialState,
  reducers: {
    onWriteModalOpen: (state) => {
      state.isOpen = true;
    },
    onWriteModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onWriteModalOpen, onWriteModalClose } =
  writePostModalSlice.actions;

export default writePostModalSlice.reducer;
