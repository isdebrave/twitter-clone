import { configureStore } from "@reduxjs/toolkit";

import me from "./reducers/me";
import loginModal from "./reducers/loginModal";
import registerModal from "./reducers/registerModal";
import postModal from "./reducers/postModal";
import users from "./reducers/users";
import posts from "./reducers/posts";
import comments from "./reducers/comments";

export const store = configureStore({
  reducer: { me, loginModal, registerModal, postModal, users, posts, comments },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
