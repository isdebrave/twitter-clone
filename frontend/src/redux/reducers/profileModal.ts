import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const profileModalSlice = createSlice({
  name: "profileModal",
  initialState,
  reducers: {
    onProfileModalOpen: (state) => {
      state.isOpen = true;
    },
    onProfileModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onProfileModalOpen, onProfileModalClose } =
  profileModalSlice.actions;

export default profileModalSlice.reducer;
