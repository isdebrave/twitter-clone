import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-hot-toast";

import { PostState } from "./post";

interface DataType {
  userId: string;
  navigate: NavigateFunction;
}

export const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (data: DataType) => {
    const { userId, navigate } = data;

    try {
      const response = await axios.post("/user/profile", { userId });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
        navigate("/home");
      }
    }
  }
);

export interface UserState {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  coverImage: string | null;
  profileImage: string | null;
  hasNotification: boolean | null;
  createdAt: string;
  updatedAt: string;
  followingIds: string[];
  followerIds: string[];
  posts: PostState[];
}

const initialState: UserState = {
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
  posts: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onProfileRemove: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { onProfileRemove } = profileSlice.actions;

export default profileSlice.reducer;
