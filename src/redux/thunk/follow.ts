import { NavigateFunction } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { fetchProfile } from "./profile";
import { AppDispatch } from "../store";
import { fetchFollowList } from "./followList";
import { fetchMe } from "./me";

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

      if (!isFollowing(followerId)) {
        response = await axios.post("/user/follow", { followerId });
      } else {
        response = await axios.delete("/user/follow", { data: { followerId } });
      }

      dispatch(fetchMe(navigate));

      // fetchProfile 없어도 되는지 확인
      dispatch(fetchProfile({ userId, navigate }));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);