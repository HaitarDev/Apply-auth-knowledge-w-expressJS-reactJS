import { NextFunction, Request, Response } from "express";
import { IUser, User } from "./userMode";
import { AppError } from "./appError";
import { JwtPayload, verify } from "jsonwebtoken";

export const protectController = async (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) => {
  let token: string;
  // get token and check if it valid
  if (
    !req.headers.authorization ||
    !req.headers.authorization.split(" ")[0].startsWith("Bearer")
  ) {
    return next(new AppError(404, "You have no authorization"));
  }

  token = req.headers.authorization.split(" ")[1];
  const decoded: string | JwtPayload = verify(token, process.env.JWT_SECRET!);

  // check if there is still a user
  const userId = (decoded as JwtPayload).id;
  if (!userId)
    return next(new AppError(401, "There is no authorization for this"));

  const user = await User.findById(userId);
  if (!user) return next(new AppError(401, "There is no user"));

  req.user = user;
  // pass the user to request
  next();
};
