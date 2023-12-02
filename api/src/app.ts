import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import path from "path";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();

dotenv.config();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    // cookie: { httpOnly: true, secure: true },
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json(err.message);
});

app.listen(8080, () => console.log("✅ Listening..."));
