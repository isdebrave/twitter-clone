import { NextFunction, Request, Response } from "express";

import prisma from "../libs/prismadb";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req.body.data;

  try {
    const user = req.session.user;

    if (user && user.id) {
      await prisma.post.create({
        data: {
          body,
          userId: user.id,
        },
      });
      return res.status(201).json();
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
