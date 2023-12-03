import express from "express";

import { me, users, profile } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/me", me);
userRouter.get("/all", users);
userRouter.post("/profile", profile);

export default userRouter;
