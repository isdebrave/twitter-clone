import express from "express";

import {
  user,
  email,
  phone,
  code,
  register,
  existedEmail,
  google,
  googleCallback,
  github,
  githubCallback,
  login,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/user", user);

authRouter.post("/email", email);
authRouter.post("/email/code", code);
authRouter.post("/email/exist", existedEmail);
authRouter.post("/phone", phone);
authRouter.post("/register", register);

authRouter.get("/google", google);
authRouter.get("/google/callback", googleCallback);

authRouter.get("/github", github);
authRouter.get("/github/callback", githubCallback);

authRouter.post("/login", login);

export default authRouter;
