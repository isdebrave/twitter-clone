import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  UserState,
  onAddFollowerToProfile,
  onAddFollowingToProfile,
} from "./profile";
import { AppDispatch } from "../store";

export const fetchFollowList = createAsyncThunk("fetchFollowList", async () => {
  try {
    const response = await axios.get("/user/all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

interface DataType {
  followerId: string;
  userId: string;
  meId: string;
  dispatch: AppDispatch;
}

export const fetchFollow = createAsyncThunk(
  "fetchFollow",
  async (data: DataType) => {
    const { followerId, userId, meId, dispatch } = data;

    try {
      const response = await axios.post("/user/follow", { followerId });

      const meRest = response.data.meRest;
      const followerRest = response.data.followerRest;

      if (userId === meId) {
        dispatch(onAddFollowingToProfile(meRest));
      }
      if (userId === followerId) {
        dispatch(onAddFollowerToProfile(followerRest));
      }

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
