import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

import { AppDispatch } from "../store";
import { fetchPosts } from "./posts";
import { fetchProfile } from "./profile";

interface postDataType {
  postId: string;
  navigate: NavigateFunction;
}

export const fetchPost = createAsyncThunk(
  "fetchPost",
  async (data: postDataType) => {
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

export const fetchWritePost = createAsyncThunk(
  "fetchWritePost",
  async (data: FormData) => {
    try {
      const response = await axios.post("/post", data);
      return response.data;
    } catch (error) {
      console.log(error);
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
