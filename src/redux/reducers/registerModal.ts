import { createSlice } from "@reduxjs/toolkit";

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
});

export const { onRegisterModalOpen, onRegisterModalClose } =
  registerModalSlice.actions;

export default registerModalSlice.reducer;
