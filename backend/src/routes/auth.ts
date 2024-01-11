import express from "express";

import {
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
  logout,
} from "../controllers/auth";

const authRouter = express.Router();

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
authRouter.get("/logout", logout);

export default authRouter;
