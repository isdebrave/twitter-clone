import { createSlice } from "@reduxjs/toolkit";

import { fetchRegisterModal } from "../thunk/registerModal";

const initialState: { isOpen: boolean } = {
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

  extraReducers: (builder) => {
    builder.addCase(fetchRegisterModal.fulfilled, () => {});
  },
});

export const { onRegisterModalOpen, onRegisterModalClose } =
  registerModalSlice.actions;

export default registerModalSlice.reducer;
