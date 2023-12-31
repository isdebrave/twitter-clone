import { NextFunction, Request, Response } from "express";
import path from "path";

import prisma from "../libs/prismadb";

export const posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  if (!page || !limit) return;

  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, username: true, profileImage: true },
        },
        comments: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: +page * +limit,
      take: +limit,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const post = async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: { select: { id: true, username: true, profileImage: true } },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 게시물이 존재하지 않습니다.");
  }
};

export const registerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = JSON.parse(req.body.data);

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
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
        user: { select: { id: true, username: true, profileImage: true } },
        comments: { select: { id: true } },
      },
    });

    return res.status(201).json(post);
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

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return res.status(200).json();
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

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  let post;
  try {
    post = await prisma.post.findUnique({
      where: { id: postId },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 게시물이 존재하지 않습니다.");
  }

  try {
    if (!post) return res.status(400).json("해당 게시물이 존재하지 않습니다.");

    const idx = post.likedIds.findIndex(
      (userId) => userId === req.session.meId
    );

    if (idx === -1) {
      post.likedIds.push(req.session.meId);
    } else {
      post.likedIds.splice(idx, 1);
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: post.likedIds,
      },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const views = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body;

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        views: { increment: 1 },
      },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const comments = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { page, limit } = req.query;

  if (!page || !limit) return;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          include: {
            user: { select: { id: true, username: true, profileImage: true } },
          },
          orderBy: { createdAt: "desc" },
          skip: +page * +limit,
          take: +limit,
        },
      },
    });

    if (!post) throw new Error();

    return res.status(200).json(post.comments);
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 게시물이 존재하지 않습니다.");
  }
};

export const registerComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body;
  const { body } = JSON.parse(req.body.data);

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: req.session.meId,
        postId,
      },
      include: {
        user: { select: { id: true, username: true, profileImage: true } },
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId } = req.body;

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
