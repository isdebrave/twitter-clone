import { createSlice } from "@reduxjs/toolkit";

import { fetchLoginModal } from "../thunk/loginModal";

const initialState: { isOpen: boolean } = {
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

  extraReducers: (builder) => {
    builder.addCase(fetchLoginModal.fulfilled, () => {});
  },
});

export const { onLoginModalOpen, onLoginModalClose } = loginModalSlice.actions;

export default loginModalSlice.reducer;
