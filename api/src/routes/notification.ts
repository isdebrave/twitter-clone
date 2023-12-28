import express from "express";

import { notifications } from "../controllers/notification";

const notificationRouter = express.Router();

notificationRouter.get("/all", notifications);

export default notificationRouter;
