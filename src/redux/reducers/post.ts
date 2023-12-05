import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { CommentsState } from "./comments";
import { UserState, fetchProfile } from "./profile";
import { AppDispatch } from "../store";
import { fetchPosts } from "./posts";

interface PostDataType {
  postId: string;
  navigate: NavigateFunction;
}

export const fetchPost = createAsyncThunk(
  "fetchPost",
  async (data: PostDataType) => {
    const { postId, navigate } = data;

    try {
      const response = await axios.get(`/post/${postId}`);
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

interface LikedDataType {
  postId: string;
  dispatch: AppDispatch;
  meId: string;
  userId?: string;
  navigate?: NavigateFunction;
}

export const fetchPostLiked = createAsyncThunk(
  "fetchPostLiked",
  async (data: LikedDataType) => {
    const { postId, dispatch, meId, userId, navigate } = data;

    try {
      const response = await axios.post("/post/liked", { postId });
      dispatch(fetchPosts());

      if (userId && navigate) {
        dispatch(fetchProfile({ userId, navigate }));
      }
      return { meId, status: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export interface PostState {
  id: string;
  body: string;
  images: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likedIds: string[];
  user: UserState;
  comments: CommentsState[];
}

const initialState: PostState = {
  id: "",
  body: "",
  images: [],
  views: 0,
  createdAt: "",
  updatedAt: "",
  userId: "",
  likedIds: [],
  user: {
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
  },
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(fetchPostLiked.fulfilled, (state, action) => {
      const { meId, status } = action.payload!;

      if (status === "ADD") {
        state.likedIds.push(meId);
      } else {
        state.likedIds = state.likedIds.filter((userId) => userId !== meId);
      }
    });
  },
});

export default postSlice.reducer;
