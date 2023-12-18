import { Post, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import path from "path";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.meId) {
      const me = await prisma.user.findUnique({
        where: { id: req.session.meId },
      });

      let reducedMe;
      if (me) {
        const { hashedPassword, name, birth, ...meObj } = me;
        reducedMe = meObj;
      }
      return res.status(200).json(reducedMe);
    } else {
      return res.status(200).json();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const users = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let users = await prisma.user.findMany();

    if (req.session.meId) {
      users = users.filter((user) => user.id !== req.session.meId);
    }

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
  const { userId } = req.params;
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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, bio } = JSON.parse(req.body.data);
  const { userId } = req.params;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.log(error);
    return res.status(401).json("권한이 없습니다. 다시 로그인 해주세요.");
  }

  try {
    let coverImage;
    let profileImage;

    if (user) {
      coverImage = user.coverImage;
      profileImage = user.profileImage;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.coverImage) {
      coverImage = path.join(files.coverImage[0].path);
    }
    if (files.profileImage) {
      profileImage = path.join(files.profileImage[0].path);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        bio,
        coverImage,
        profileImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followerId } = req.body;

    if (req.session.meId) {
      const me = await prisma.user.update({
        where: {
          id: req.session.meId,
        },
        data: {
          followingIds: { push: followerId },
        },
      });

      const follower = await prisma.user.update({
        where: {
          id: followerId,
        },
        data: {
          followerIds: { push: req.session.meId },
        },
      });

      const { hashedPassword, name, birth, ...meRest } = me;
      const {
        hashedPassword: _hashedPassword,
        name: _name,
        birth: _birth,
        ...followerRest
      } = follower;

      return res.status(200).json({ meRest, followerRest });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const removeFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followerId } = req.body;

    if (req.session.meId) {
      const me = await prisma.user.findUnique({
        where: { id: req.session.meId },
      });

      if (me) {
        const updatedFollowingIds = me.followingIds.filter(
          (userId) => userId !== followerId
        );

        await prisma.user.update({
          where: { id: req.session.meId },
          data: { followingIds: updatedFollowingIds },
        });
      }

      const follower = await prisma.user.findUnique({
        where: { id: followerId },
      });

      if (follower) {
        const updatedFollowerIds = follower.followerIds.filter(
          (userId) => userId !== req.session.meId
        );

        await prisma.user.update({
          where: { id: followerId },
          data: { followerIds: updatedFollowerIds },
        });
      }

      return res.status(200).json();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
