import { NextFunction, Request, Response } from "express";
import path from "path";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session.meId);
  if (!req.session.meId) return res.status(200).json();

  try {
    const me = await prisma.user.findUnique({
      where: { id: req.session.meId },
      select: {
        id: true,
        username: true,
        profileImage: true,
        hasNotification: true,
        followingIds: true,
      },
    });

    if (!me) throw new Error();

    return res.status(200).json(me);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const followLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();

    const followLists = users.filter((user) => user.id !== req.session.meId);

    return res.status(200).json(followLists);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const profile = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: { select: { id: true } } },
    });

    const profileWithCount = {
      ...profile,
      totalPostsCount: profile?.posts.length,
    };

    return res.status(200).json(profileWithCount);
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 계정이 존재하지 않습니다.");
  }
};

export const profilePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { lastId, limit } = req.query;

  const where = { userId } as { userId: string; id?: object };
  if (parseInt(lastId as string, 10)) {
    where.id = { lt: lastId as string };
  }

  const limitNumber = parseInt(limit as string, 0);

  try {
    const profilePosts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: { id: true, username: true, profileImage: true },
        },
        comments: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limitNumber,
    });

    const profilePostsWithCount = profilePosts.map((post) => ({
      ...post,
      totalCommentsCount: post.comments.length,
    }));

    return res.status(200).json(profilePostsWithCount);
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

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  let user;
  try {
    user = await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 계정이 존재하지 않습니다.");
  }

  try {
    if (!user) throw new Error();

    let coverImage = user.coverImage;
    let profileImage = user.profileImage;

    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    if (files.coverImage) {
      coverImage = files.coverImage[0].location;
    }
    if (files.profileImage) {
      profileImage = files.profileImage[0].location;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { username, bio, coverImage, profileImage },
    });

    return res.status(200).json();
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
  const { followerId } = req.body;

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.user.update({
      where: { id: req.session.meId },
      data: { followingIds: { push: followerId } },
    });

    await prisma.user.update({
      where: { id: followerId },
      data: { followerIds: { push: req.session.meId } },
    });

    return res.status(200).json();
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
  const { followerId } = req.body;

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  let me;
  try {
    me = await prisma.user.findUnique({
      where: { id: req.session.meId },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("해당 계정이 존재하지 않습니다.");
  }

  let follower;
  try {
    follower = await prisma.user.findUnique({
      where: { id: followerId },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("팔로우 계정이 존재하지 않습니다.");
  }

  try {
    if (!me) throw new Error();

    const updatedFollowingIds = me.followingIds.filter(
      (userId) => userId !== followerId
    );

    await prisma.user.update({
      where: { id: req.session.meId },
      data: { followingIds: updatedFollowingIds },
    });

    if (!follower) throw new Error();

    const updatedFollowerIds = follower.followerIds.filter(
      (userId) => userId !== req.session.meId
    );

    await prisma.user.update({
      where: { id: followerId },
      data: { followerIds: updatedFollowerIds },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { hasNotification: false },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value } = req.body;

    const users = await prisma.user.findMany({
      where: { username: { contains: value } },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
