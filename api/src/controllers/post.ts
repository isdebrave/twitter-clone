import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import path from "path";

import prisma from "../libs/prismadb";

export const posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    type SafeUser = Omit<User, "hashedPassword" | "name" | "birth">;
    for (const post of posts) {
      const user = post.user;
      const { hashedPassword, name, birth, ...userObj } = user;
      (post.user as SafeUser) = userObj;
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req.body;

  try {
    const user = req.session.user;

    if (user && user.id) {
      const files = req.files as Express.Multer.File[];

      const images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(path.join(files[i].path));
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
