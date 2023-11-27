import { NextFunction, Request, Response } from "express";

export const me = (req: Request, res: Response) => {
  const loggedInUser = req.session.user;

  if (loggedInUser) {
    return res.status(200).json(loggedInUser);
  } else {
    return res.status(200).json();
  }
};
