import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./profile";

const initialState: UserState[] = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    onUsersSave: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { onUsersSave } = usersSlice.actions;

export default usersSlice.reducer;
