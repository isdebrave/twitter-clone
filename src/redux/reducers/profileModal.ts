import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
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
