import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import path from "path";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import notificationRouter from "./routes/notification";

import "./types/expressSession";

const app = express();

dotenv.config();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));
app.use(hpp());
app.use(helmet());
app.use(
  cors({ origin: "https://isdebrave-twitter-clone.shop", credentials: true })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
      httpOnly: true,
      secure: true,
      domain: ".isdebrave-twitter-clone.shop",
    },
  })
);

// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
//   app.use(hpp());
//   app.use(helmet());
//   app.use(
//     cors({ origin: "https://isdebrave-twitter-clone.shop", credentials: true })
//   );
//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET!,
//       resave: false,
//       saveUninitialized: false,
//       store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
//       cookie: {
//         httpOnly: true,
//         secure: true,
//         domain: ".isdebrave-twitter-clone.shop",
//       },
//     })
//   );
// } else {
//   app.use(morgan("dev"));
//   app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );
// }

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/notification", notificationRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json("서버 에러: 나중에 다시 시도해주세요.");
});

app.listen(8080, () => console.log("✅ backend: Listening on port 8080"));
