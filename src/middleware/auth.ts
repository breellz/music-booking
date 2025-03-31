import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";

export interface CustomRequest extends Request {
 user?: IUser;
}

export const Auth = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 try {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
   throw new Error("Token not found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  const user = await User.findOne({ _id: (decoded as any)._id });

  if (!user) {
   throw new Error();
  }
  req.user = user;
  next();
 } catch (error) {
  res.status(401).send({ error: "Authentication required" });
 }
};
