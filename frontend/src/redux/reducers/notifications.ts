import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  id: string;
  body: string;
  createdAt: string;
  userId: string;
}

const initialState: NotificationState[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    onNotifications: (state, action) => {
      return action.payload;
    },
    onNotificationDelete: (state, action) => {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { onNotifications, onNotificationDelete } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
