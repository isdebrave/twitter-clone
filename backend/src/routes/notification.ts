import express from "express";

import {
  notifications,
  registerNotification,
  deleteNotification,
} from "../controllers/notification";

const notificationRouter = express.Router();

notificationRouter.get("/all", notifications);
notificationRouter.post("/", registerNotification);
notificationRouter.delete("/", deleteNotification);

export default notificationRouter;
