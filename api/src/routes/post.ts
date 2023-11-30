import express from "express";

import { post } from "../controllers/post";

const postRouter = express.Router();

postRouter.post("/", post);

export default postRouter;
