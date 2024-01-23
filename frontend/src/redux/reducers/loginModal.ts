import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    onLoginModalOpen: (state) => {
      state.isOpen = true;
    },
    onLoginModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onLoginModalOpen, onLoginModalClose } = loginModalSlice.actions;

export default loginModalSlice.reducer;
