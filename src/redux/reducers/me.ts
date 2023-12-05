import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";

import { UserState } from "./profile";

export const fetchMe = createAsyncThunk(
  "fetchMe",
  async (navigate: NavigateFunction) => {
    try {
      const response = await axios.get("/user/me");

      if (!response.data) {
        localStorage.removeItem("auth");
        return navigate("/auth");
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

type ReducedUserState = Omit<UserState, "posts">;

const initialState: ReducedUserState = {
  id: "",
  username: "",
  email: "",
  bio: null,
  coverImage: null,
  profileImage: null,
  hasNotification: null,
  createdAt: "",
  updatedAt: "",
  followingIds: [],
  followerIds: [],
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    onMeRemove: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { onMeRemove } = meSlice.actions;

export default meSlice.reducer;
