import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";

import { posts, registerPost, lookAroundPost } from "../controllers/post";

if (!fs.existsSync("uploads/bodyImages")) {
  fs.mkdirSync("uploads/bodyImages", { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/bodyImages");
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

const bodyImagesUpload = multer({ storage, fileFilter });

const postRouter = express.Router();

postRouter.get("/", posts);
postRouter.post("/", bodyImagesUpload.array("bodyImages"), registerPost);
postRouter.get("/:postId", lookAroundPost);

export default postRouter;
