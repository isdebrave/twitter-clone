import { createSlice } from "@reduxjs/toolkit";

import { ProfileState } from "./profile";
import { fetchFollowList } from "../thunk/followList";

type UserState = Omit<ProfileState, "posts">;

const initialState: UserState[] = [];

export const followListSlice = createSlice({
  name: "followList",
  initialState,
  reducers: {
    changeLabel: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFollowList.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { changeLabel } = followListSlice.actions;

export default followListSlice.reducer;
