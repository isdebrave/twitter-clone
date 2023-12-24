import { createSlice } from "@reduxjs/toolkit";

import { ProfileState } from "./profile";

export type MeState = Omit<ProfileState, "posts">;
const initialState: MeState = {
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
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    onMe: (state, action) => {
      return action.payload;
    },
    onMeRemove: () => {
      return initialState;
    },
    onMeProfileUpdate: (state, action) => {
      const { profileImage } = action.payload;

      state.profileImage = profileImage;
    },
    onMeFollowingAdd: (state, action) => {
      const { userId } = action.payload;

      state.followingIds.push(userId);
    },
    onMeFollowingDelete: (state, action) => {
      const { userId } = action.payload;

      state.followingIds = state.followingIds.filter((id) => id !== userId);
    },
  },
});

export const {
  onMe,
  onMeRemove,
  onMeProfileUpdate,
  onMeFollowingAdd,
  onMeFollowingDelete,
} = meSlice.actions;

export default meSlice.reducer;
