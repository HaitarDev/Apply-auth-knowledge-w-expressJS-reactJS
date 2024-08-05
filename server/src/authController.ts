import { NextFunction, Request, Response } from "express";
import { IUser, User } from "./userMode";
import { AppError } from "./appError";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function signToken(id: string) {
  return jwt.sign(id, "asdasdjasrb123123");
}
export function sentToken(res: Response, token: string, user?: IUser) {
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // convert 90d to ms from
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  return res.status(201).json({
    status: "success",
    user: {
      name: user?.name,
      email: user?.email,
      token,
    },
  });
}
export async function registerController(
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, name, password } = req.body;
    if (!email || !password) return next(new AppError(422, "There is no info"));

    if (!isEmail(email)) {
      return next(new AppError(422, "Email are not valid !"));
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.findOne({
      name,
    });

    if (user)
      return next(
        new AppError(402, "User with this credintials already exist")
      );
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    });

    const token = signToken(newUser.id);

    sentToken(res, token, newUser);
  } catch (error: any) {
    console.log(error.message);
    next(new AppError(400, "Fail to register"));
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError(404, "There is no info"));
    }

    if (!isEmail(req.body.email)) {
      return next(new AppError(401, "Email are not valid !"));
    }

    const user = await User.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(401, "Password are incorrect"));
    }

    const token = signToken(user.id);

    sentToken(res, token, user);
  } catch (error) {
    next(new AppError(400, "fail to login"));
  }
}
