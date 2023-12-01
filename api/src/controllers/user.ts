import { NextFunction, Request, Response } from "express";

export const me = (req: Request, res: Response) => {
  const loggedInUser = req.session.user;

  if (loggedInUser) {
    return res.status(200).json(loggedInUser);
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
