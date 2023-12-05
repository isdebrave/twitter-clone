import express from "express";

import {
  me,
  users,
  profile,
  postFollow,
  deleteFollow,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/me", me);
userRouter.get("/all", users);
userRouter.post("/profile", profile);
userRouter.post("/follow", postFollow);
userRouter.delete("/follow", deleteFollow);

export default userRouter;
