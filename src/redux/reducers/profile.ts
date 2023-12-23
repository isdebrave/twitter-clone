import { createSlice } from "@reduxjs/toolkit";

import { PostState } from "./post";

export interface ProfileState {
  id: string;
  username: string;
  email: string;
  bio: string;
  coverImage: string;
  profileImage: string;
  hasNotification: boolean;
  createdAt: string;
  updatedAt: string;
  followingIds: string[];
  followerIds: string[];
  posts: PostState[];
}

const initialState: ProfileState = {
  id: "",
  username: "",
  email: "",
  bio: "",
  coverImage: "",
  profileImage: "",
  hasNotification: false,
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
    onProfile: (state, action) => {
      return action.payload;
    },
    onProfileRemove: () => {
      return initialState;
    },
    onProfilePostsLiked: (state, action) => {
      const { isExists, userId, postId } = action.payload;

      const post = state.posts.find((post) => post.id === postId);
      if (!post) return;

      if (!isExists) {
        post.likedIds.push(userId);
      } else {
        post.likedIds = post.likedIds.filter((id) => id !== userId);
      }
    },
    onProfilePostsAdd: (state, action) => {
      state.posts.unshift(action.payload);
    },
    onProfileUpdate: (state, action) => {
      const { coverImage, profileImage, username, bio } = action.payload;

      state.coverImage = coverImage || state.coverImage;
      state.profileImage = profileImage || state.profileImage;
      state.username = username;
      state.bio = bio;

      if (profileImage) {
        state.posts.forEach((post) => (post.user.profileImage = profileImage));
      }
    },
  },
});

export const {
  onProfile,
  onProfileRemove,
  onProfilePostsLiked,
  onProfilePostsAdd,
  onProfileUpdate,
} = profileSlice.actions;

export default profileSlice.reducer;
