import { configureStore } from "@reduxjs/toolkit";

import me from "./reducers/me";
import followList from "./reducers/followList";
import posts from "./reducers/posts";
import notifications from "./reducers/notifications";
import profile from "./reducers/profile";
import post from "./reducers/post";

export const store = configureStore({
  reducer: {
    me,
    followList,
    posts,
    notifications,
    profile,
    post,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
