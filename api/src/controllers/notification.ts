import { NextFunction, Request, Response } from "express";

export const notifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: userId as string },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
