import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";
import { User } from "./userMode";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find();

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(401, "Error on getUsersController"));
  }
}
