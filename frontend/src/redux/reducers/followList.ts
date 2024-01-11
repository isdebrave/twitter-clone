import { createSlice } from "@reduxjs/toolkit";

import { ProfileState } from "./profile";

type UserState = Omit<ProfileState, "posts">;

const initialState: UserState[] = [];

export const followListSlice = createSlice({
  name: "followList",
  initialState,
  reducers: {
    onFollowList: (state, action) => {
      return action.payload;
    },
  },
});

export const { onFollowList } = followListSlice.actions;

export default followListSlice.reducer;
