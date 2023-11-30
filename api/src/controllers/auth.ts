import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import axios from "axios";

import prisma from "../libs/prismadb";

dotenv.config();

export const email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: email } = req.body;

  const min = 100000;
  const max = 999999;
  const code = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  const expiration = Date.now() + 1000 * 60 * 60 * 2; // 2시간
  req.session.code = code;
  req.session.expiration = expiration;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    //   xpcx xtto foxz clqi
    const options = {
      from: process.env.NODEMAILER_USER,
      to: email,

      subject: `Twitter 인증 코드는 ${code}입니다`,
      html: `
        <h1>이메일 주소 확인하기</h1>
        <pre>
            Twitter 계정을 생성하기 전 거쳐야 할 간단한 단계가 있습니다. 이 이메일
            주소가 맞는지 확인해야 합니다. 계정에 쓰일 올바른 주소가 맞는지 확인해
            주세요.
        </pre>
        <pre>
            X를 시작하려면 다음 인증 코드를 입력하세요.
            <span style="font-size: 26px">${code}</span>
            인증 코드는 2시간 후에 만료됩니다.
        </pre>
        <pre>
            감사합니다.
            Twitter
        </pre>
      `,
    };

    await transporter.sendMail(options);

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const code = (req: Request, res: Response) => {
  const { code } = req.body;

  if (code !== req.session.code) {
    return res.status(401).json("코드가 틀렸습니다. 다시 시도해주세요.");
  }

  if (Date.now() > req.session.expiration!) {
    return res.status(401).json("코드가 만료되었습니다. 다시 시도해주세요.");
  }

  return res.status(200).json();
};

export const existedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(401).json("이미 등록된 이메일입니다.");
    }

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const phone = (req: Request, res: Response) => {};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, id: email, birth, password } = req.body.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        username: name,
        email,
        birth,
        hashedPassword,
      },
    });

    const {
      hashedPassword: _hashedPassword,
      name: _name,
      birth: _birth,
      ...userObj
    } = user;
    req.session.user = userObj;

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const google = (req: Request, res: Response) => {
  const base_url = "https://accounts.google.com/o/oauth2/v2/auth";

  const config = {
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL as string,
    response_type: "code",
    scope: process.env.GOOGLE_SCOPE as string,
  };

  const config_url = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${config_url}`;

  return res.redirect(final_url);
};

export const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const base_url = "https://oauth2.googleapis.com/token";

    const config = {
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      code: req.query.code as string,
      grant_type: "authorization_code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URL as string,
    };

    const config_url = new URLSearchParams(config).toString();
    const final_url = `${base_url}?${config_url}`;

    // access_token 요청
    const { data: tokenRequest } = await axios.post(final_url, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // access_token 얻음 -> user data 요청
    if (tokenRequest.access_token) {
      const { access_token } = tokenRequest;

      const api_url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`;
      const { data: googleUser } = await axios.get(api_url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let user = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: googleUser.name,
            username: googleUser.name,
            email: googleUser.email,
            profileImage: googleUser.picture,
            account: {
              create: {
                type: "google",
                providerId: googleUser.id + "",
              },
            },
          },
        });
      }

      req.session.user = user;

      return res.redirect("http://localhost:3000/home");
    } else {
      return res.redirect("http://localhost:3000/auth");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const github = (req: Request, res: Response) => {
  const base_url = "https://github.com/login/oauth/authorize";

  const config = {
    client_id: process.env.GITHUB_CLIENT_ID as string,
    scope: process.env.GITHUB_SCOPE as string,
  };

  const config_url = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${config_url}`;

  return res.redirect(final_url);
};

export const githubCallback = async (req: Request, res: Response) => {
  const base_url = "https://github.com/login/oauth/access_token";

  const config = {
    client_id: process.env.GITHUB_CLIENT_ID as string,
    client_secret: process.env.GITHUB_CLIENT_SECRET as string,
    code: req.query.code as string,
  };

  const config_url = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${config_url}`;

  // access_token 요청
  const { data: tokenRequest } = await axios.post(final_url, null, {
    headers: {
      Accept: "application/json",
    },
  });

  // access_token 얻음 -> user data 요청
  if (tokenRequest.access_token) {
    const { access_token } = tokenRequest;

    const api_url = "https://api.github.com/user";
    const { data: githubUser } = await axios.get(api_url, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    let user = await prisma.user.findUnique({
      where: { email: githubUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: githubUser.name,
          username: githubUser.name,
          email: githubUser.email,
          profileImage: githubUser.avatar_url,
          account: {
            create: {
              type: "github",
              providerId: githubUser.id + "",
            },
          },
        },
      });
    }

    req.session.user = user;

    return res.redirect("http://localhost:3000/home");
  } else {
    return res.redirect("http://localhost:3000/auth");
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: email, password } = req.body.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json("해당 계정을 찾을 수 없습니다.");
    }

    let checkPassword;
    if (user.hashedPassword) {
      checkPassword = await bcrypt.compare(password, user.hashedPassword);
    }

    if (!checkPassword) {
      return res.status(401).json("잘못된 비밀번호입니다.");
    }

    const { hashedPassword, name, birth, ...userObj } = user;
    req.session.user = userObj;

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.user = null;
  return res.redirect("http://localhost:3000/auth");
};
