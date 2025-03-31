import { NextFunction, Request, Response } from "express";
import {
 sendErrorResponse,
 sendSuccessResponse,
} from "src/middleware/error/responseHandler";
import { authValidation } from "src/utils/helpers/validators/validators";
import { createUser, getUserByEmail, logIn } from "../services/auth.service";
import logger from "../utils/helpers/logger";

export const signUp = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const { email, password } = req.body;
 try {
  authValidation({ email, password });
  const lowercaseEmail = email.trim().toLowerCase();
  const user = await getUserByEmail(lowercaseEmail);

  if (user) {
   return sendErrorResponse(res, "user already exists", 400);
  }

  const newUser = await createUser({ email: lowercaseEmail, password });
  const token = await newUser.generateAuthToken();

  return sendSuccessResponse(res, "Call fetched successfully", 200, {
   user: newUser,
   token,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

export const signIn = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const { email, password } = req.body;
 try {
  authValidation({ email, password });

  const lowercaseEmail = email.trim().toLowerCase();
  const { user, token } = await logIn({ email: lowercaseEmail, password });

  return sendSuccessResponse(res, "Login successful", 200, { user, token });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};
