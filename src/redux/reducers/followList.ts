import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./profile";

const initialState: UserState[] = [];

export const followListSlice = createSlice({
  name: "followList",
  initialState,
  reducers: {
    onFollowListSave: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { onFollowListSave } = followListSlice.actions;

export default followListSlice.reducer;
