import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
 public statusCode: number;

 constructor(message: string, statusCode: number = 500) {
  super(message);
  this.statusCode = statusCode;
  Error.captureStackTrace(this, this.constructor);
 }
}

export const errorHandler = (
 err: AppError | ValidationError,
 req: Request,
 res: Response,
 next: NextFunction
): Response => {
 if (err instanceof ValidationError) {
  return res.status(400).json({
   status: "error",
   statusCode: 400,
   message: err.message,
  });
 }

 const statusCode = err.statusCode || 500;
 const message = err.message || "Internal Server Error";
 return res.status(statusCode).json({
  status: "error",
  statusCode,
  message,
 });
};

export class ValidationError extends Error {
 constructor(message: string) {
  super(message);
  this.name = "ValidationError";
 }
}

export class PermissionError extends Error {
 constructor(message: string) {
  super(message);
  this.name = "PermissionError";
 }
}

export default AppError;
