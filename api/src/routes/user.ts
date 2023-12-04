import express from "express";

import { me, users, profile, follow } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/me", me);
userRouter.get("/all", users);
userRouter.post("/profile", profile);
userRouter.post("/follow", follow);

export default userRouter;
