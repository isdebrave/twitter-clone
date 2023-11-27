import express from "express";

import { me } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/", me);

export default userRouter;
