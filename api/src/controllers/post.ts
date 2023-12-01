import { NextFunction, Request, Response } from "express";
import path from "path";

import prisma from "../libs/prismadb";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req.body;

  try {
    const user = req.session.user;

    if (user && user.id) {
      const files = req.files as Express.Multer.File[];

      const images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(path.join(process.cwd(), `/${files[i].path}`));
      }

      const post = await prisma.post.create({
        data: {
          body,
          images,
          userId: user.id,
        },
      });

      return res.status(201).json(post);
    } else {
      return res
        .status(401)
        .json("작성할 권한이 없습니다. 로그인을 다시 해주세요.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
