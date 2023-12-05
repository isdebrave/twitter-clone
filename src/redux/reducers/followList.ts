import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UserState, fetchProfile } from "./profile";
import { AppDispatch } from "../store";
import { NavigateFunction } from "react-router-dom";

export const fetchFollowList = createAsyncThunk("fetchFollowList", async () => {
  try {
    const response = await axios.get("/user/all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

interface DataType {
  isFollowing: (followerId: string) => boolean;
  followerId: string;
  userId: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

export const fetchFollow = createAsyncThunk(
  "fetchFollow",
  async (data: DataType) => {
    const { isFollowing, followerId, userId, dispatch, navigate } = data;

    try {
      let response;

      if (isFollowing(followerId)) {
        response = await axios.post("/user/follow", { followerId });
      } else {
        response = await axios.delete("/user/follow", { data: { followerId } });
      }

      dispatch(fetchProfile({ userId, navigate }));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

type ReducedUserState = Omit<UserState, "posts">;

const initialState: ReducedUserState[] = [];

export const followListSlice = createSlice({
  name: "followList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFollowList.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export default followListSlice.reducer;
