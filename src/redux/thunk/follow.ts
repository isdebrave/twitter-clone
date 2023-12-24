import { NavigateFunction } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch } from "../store";
// import { fetchProfile } from "./profile";
import { KeyedMutator } from "swr";

interface DataType {
  isFollowing: (followerId: string) => boolean;
  followerId: string;
  userId: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  mutateMe: KeyedMutator<any>;
  mutateProfile: KeyedMutator<any>;
}

export const fetchFollow = createAsyncThunk(
  "fetchFollow",
  async (data: DataType) => {
    const {
      isFollowing,
      followerId,
      userId,
      dispatch,
      navigate,
      mutateMe,
      mutateProfile,
    } = data;

    try {
      let response;

      if (!isFollowing(followerId)) {
        response = await axios.post("/user/follow", { followerId });
      } else {
        response = await axios.delete("/user/follow", { data: { followerId } });
      }

      mutateMe();
      mutateProfile();
      // dispatch(fetchProfile({ userId, navigate }));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
