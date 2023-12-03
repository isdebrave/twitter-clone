import { configureStore } from "@reduxjs/toolkit";

import me from "./reducers/me";
import loginModal from "./reducers/loginModal";
import registerModal from "./reducers/registerModal";
import postFormModal from "./reducers/postFormModal";
import users from "./reducers/users";
import posts from "./reducers/posts";
import comments from "./reducers/comments";
import profile from "./reducers/profile";
import post from "./reducers/post";

export const store = configureStore({
  reducer: {
    me,
    loginModal,
    registerModal,
    postFormModal,
    users,
    posts,
    comments,
    profile,
    post,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
