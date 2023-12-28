import { createSlice } from "@reduxjs/toolkit";

export interface MeState {
  id: string;
  username: string;
  profileImage: string;
  hasNotification: boolean;
  followingIds: string[];
}

const initialState: MeState = {
  id: "",
  username: "",
  profileImage: "",
  hasNotification: false,
  followingIds: [],
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
      const { followerId } = action.payload;

      state.followingIds.push(followerId);
    },
    onMeFollowingDelete: (state, action) => {
      const { followerId } = action.payload;

      state.followingIds = state.followingIds.filter((id) => id !== followerId);
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
