import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

import {
  posts,
  post,
  registerPost,
  deletePost,
  liked,
  views,
  comments,
  registerComment,
  deleteComment,
} from "../controllers/post";

const storage = multerS3({
  s3: new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
    region: "ap-northeast-2",
  }),
  bucket: "isdebrave-twitter-clone",
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

const bodyImagesUpload = multer({ storage, fileFilter });
const commentFormData = multer();

const postRouter = express.Router();

postRouter.get("/all", posts);

postRouter.get("/:postId", post);
postRouter.post("/", bodyImagesUpload.array("bodyImages"), registerPost);
postRouter.delete("/", deletePost);

postRouter.post("/liked", liked);

postRouter.post("/views", views);

postRouter.get("/:postId/comment/all", comments);
postRouter.post("/:postId/comment", commentFormData.none(), registerComment);
postRouter.delete("/:postId/comment", deleteComment);

export default postRouter;
