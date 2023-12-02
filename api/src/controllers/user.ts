import { NextFunction, Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  if (req.session.user) {
    const me = await prisma.user.findUnique({
      where: { id: req.session.user.id },
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
