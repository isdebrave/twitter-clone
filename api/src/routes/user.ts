import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";

import {
  me,
  users,
  profile,
  updateProfile,
  addFollow,
  removeFollow,
  deleteAlert,
} from "../controllers/user";

if (!fs.existsSync("uploads/profile")) {
  fs.mkdirSync("uploads/profile", { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/profile");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, basename + "_" + Date.now() + ext);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const profileUpload = multer({ storage, fileFilter });

const userRouter = express.Router();

userRouter.get("/me", me);
userRouter.get("/all", users);
userRouter.get("/profile/:userId", profile);
userRouter.patch(
  "/profile/:userId",
  profileUpload.fields([{ name: "coverImage" }, { name: "profileImage" }]),
  updateProfile
);
userRouter.post("/follow", addFollow);
userRouter.delete("/follow", removeFollow);

userRouter.delete("/alert", deleteAlert);

export default userRouter;
