import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import Mongoose from "./database/mongoose";
import { apiRouter } from "./routes";
import { errorHandler } from "./middleware/error/errorHandler";
import AppError, { ValidationError } from "./middleware/error/errorHandler";

export const main = async (): Promise<express.Application> => {
 try {
  const app: express.Application = express();
  await Mongoose.connect();

  app.use(express.json());

  app.use("/", apiRouter);
  app.use(
   (
    err: AppError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
   ) => {
    errorHandler(err, req, res, next);
   }
  );

  return app;
 } catch (error) {
  console.error(error);
  throw new Error("Unable to connect to database");
 }
};
