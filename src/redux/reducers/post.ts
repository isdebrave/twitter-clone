import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { CommentsState } from "./comments";
import { UserState } from "./profile";
import { AppDispatch } from "../store";
import { onUpdatePosts } from "./posts";

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
}

export const fetchPostLiked = createAsyncThunk(
  "fetchPostLiked",
  async (data: LikedDataType) => {
    const { postId, dispatch, meId } = data;

    try {
      const response = await axios.post("/post/liked", { postId });

      dispatch(onUpdatePosts());

      return { meId, status: response.data };

      // axios
      // .post("/post/liked", { postId })
      // .then((res) => {
      //   dispatch(onPostLiked({ meId: me.id, status: res.data }));
      //   dispatch(onUpdatePosts());
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
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
  reducers: {
    onPostLiked: (state, action) => {
      const { meId, status } = action.payload;

      console.log(action.payload);

      if (status === "ADD") {
        state.likedIds.push(meId);
      } else {
        state.likedIds = state.likedIds.filter((userId) => userId !== meId);
      }
    },
  },
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

export const { onPostLiked } = postSlice.actions;

export default postSlice.reducer;
