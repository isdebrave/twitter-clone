import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    // cookie: { httpOnly: true, secure: true },
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json(err.message);
});

app.listen(8080, () => console.log("✅ Listening..."));
