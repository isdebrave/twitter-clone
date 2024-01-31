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

export const registerNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, userId } = req.body;

  req.session.meId = req.app.get("meId");

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.notification.create({
      data: { body, userId },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { hasNotification: true },
    });

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { notificationId } = req.body;

  req.session.meId = req.app.get("meId");

  if (!req.session.meId) return res.status(401).json("로그인이 필요합니다.");

  try {
    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
