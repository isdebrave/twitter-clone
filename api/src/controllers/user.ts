import { Post, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  if (req.session.meId) {
    const me = await prisma.user.findUnique({
      where: { id: req.session.meId },
      include: { posts: true },
    });

    return res.status(200).json(me);
  } else {
    return res.status(200).json();
  }
};

export const users = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  let profile;

  try {
    profile = await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 계정이 존재하지 않습니다.");
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId },
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

    type Profile = User & { posts: Post[] };
    (profile as Profile).posts = posts;

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
