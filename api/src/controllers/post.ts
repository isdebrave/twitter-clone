import { NextFunction, Request, Response } from "express";
import { Post, User } from "@prisma/client";
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

export const registerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req.body;

  try {
    if (req.session.meId) {
      const files = req.files as Express.Multer.File[];

      const images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(path.join(files[i].path));
      }

      const post = await prisma.post.create({
        data: {
          body,
          images,
          userId: req.session.meId,
        },
        include: {
          user: true,
          comments: true,
        },
      });

      type SafeUser = Omit<User, "hashedPassword" | "name" | "birth">;
      const user = post.user;
      const { hashedPassword, name, birth, ...userObj } = user;
      (post.user as SafeUser) = userObj;

      return res.status(201).json(post);
    } else {
      return res.status(401).json("권한이 없습니다. 로그인을 다시 해주세요.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body;

  try {
    if (req.session.meId) {
      await prisma.post.delete({
        where: { id: postId },
      });

      return res.status(200).json();
    } else {
      return res.status(401).json("권한이 없습니다. 로그인을 다시 해주세요.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const lookAroundPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  let post;

  try {
    post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 게시물이 존재하지 않습니다.");
  }

  try {
    let updatedPost;

    if (post) {
      const updatedViews = post.views + 1;

      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          views: updatedViews,
        },
        include: {
          user: true,
          comments: true,
        },
      });

      type SafeUser = Omit<User, "hashedPassword" | "name" | "birth">;
      const user = updatedPost.user;
      const { hashedPassword, name, birth, ...userObj } = user;
      (updatedPost.user as SafeUser) = userObj;
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const liked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    let idx;
    if (post && req.session.meId) {
      idx = post.likedIds.findIndex((userId) => userId === req.session.meId);

      if (idx === -1) {
        post.likedIds.push(req.session.meId);
      } else {
        post.likedIds.splice(idx, 1);
      }

      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedIds: post.likedIds,
        },
      });
    }

    if (idx === -1) {
      res.status(200).json("ADD");
    } else {
      res.status(200).json("REMOVE");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
