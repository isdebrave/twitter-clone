import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    onRegisterModalOpen: (state) => {
      state.isOpen = true;
    },
    onRegisterModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onRegisterModalOpen, onRegisterModalClose } =
  registerModalSlice.actions;

export default registerModalSlice.reducer;
