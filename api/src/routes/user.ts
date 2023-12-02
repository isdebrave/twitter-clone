import express from "express";

import { me, users } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/me", me);
userRouter.get("/all", users);

export default userRouter;
