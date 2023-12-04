import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

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
    onProfileSave: (state, action) => {
      return action.payload;
    },
    onProfileRemove: () => {
      return initialState;
    },
    onAddPostToProfile: (state, action) => {
      state.posts.unshift(action.payload);
    },
    onAddFollowingToProfile: (state, action) => {
      let { posts, ...rest } = state;
      rest = action.payload;
      return { ...rest, posts };
    },
    onAddFollowerToProfile: (state, action) => {
      let { posts, ...rest } = state;
      rest = action.payload;
      return { ...rest, posts };
    },
  },
});

export const {
  onProfileSave,
  onProfileRemove,
  onAddPostToProfile,
  onAddFollowingToProfile,
  onAddFollowerToProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
