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
    onProfilePostsDelete: (state, action) => {
      const { postId } = action.payload;

      state.posts = state.posts.filter((post) => post.id !== postId);
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
    onProfileFollowAdd: (state, action) => {
      const { meId, followerId, profileId } = action.payload;

      if (profileId === meId) {
        state.followingIds.push(followerId);
      }

      if (profileId === followerId) {
        state.followerIds.push(meId);
      }
    },
    onProfileFollowDelete: (state, action) => {
      const { meId, followerId, profileId } = action.payload;

      if (profileId === meId) {
        state.followingIds = state.followingIds.filter(
          (id) => id !== followerId
        );
      }

      if (profileId === followerId) {
        state.followerIds = state.followerIds.filter((id) => id !== meId);
      }
    },
    onProfilePostsCommentAdd: (state, action) => {
      const { postId } = action.payload;

      const post = state.posts.find((post) => post.id === postId);

      if (!post) return;

      post.comments.unshift(action.payload);
    },
    onProfilePostsCommentDelete: (state, action) => {
      const { postId, commentId } = action.payload;

      const post = state.posts.find((post) => post.id === postId);

      if (!post) return;

      post.comments = post.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const {
  onProfile,
  onProfileRemove,
  onProfilePostsLiked,
  onProfilePostsAdd,
  onProfilePostsDelete,
  onProfileUpdate,
  onProfileFollowAdd,
  onProfileFollowDelete,
  onProfilePostsCommentAdd,
  onProfilePostsCommentDelete,
} = profileSlice.actions;

export default profileSlice.reducer;
