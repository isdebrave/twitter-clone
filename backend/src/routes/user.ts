import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

import {
  me,
  followLists,
  profile,
  profilePosts,
  updateProfile,
  addFollow,
  removeFollow,
  deleteAlert,
  search,
} from "../controllers/user";

const storage = multerS3({
  s3: new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
    region: "ap-northeast-2",
  }),
  bucket: "isdebrave-twitter-clone-bucket",
  key(req, file, cb) {
    cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
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
userRouter.get("/followLists", followLists);
userRouter.get("/profile/:userId", profile);
userRouter.get("/profile/:userId/post/all", profilePosts);
userRouter.patch(
  "/profile/:userId",
  profileUpload.fields([{ name: "coverImage" }, { name: "profileImage" }]),
  updateProfile
);
userRouter.post("/follow", addFollow);
userRouter.delete("/follow", removeFollow);

userRouter.delete("/alert", deleteAlert);

userRouter.post("/search", search);

export default userRouter;
