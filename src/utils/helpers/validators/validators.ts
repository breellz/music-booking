import Joi from "joi";
import { ValidationError } from "../../../middleware/error/errorHandler";
import mongoose from "mongoose";

export interface IAuthData {
 email: string;
 password: string;
}

export const authValidation = (data: IAuthData) => {
 const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
   .pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$")
   )
   .required()
   .messages({
    "string.pattern.base":
     "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
   }),
 });
 const { error } = schema.validate(data);
 if (error) {
  throw new ValidationError(error.details[0].message);
 }
 return true;
};

export const validateEmail = (email: string) => {
 const schema = Joi.string().email().required();
 const { error } = schema.validate(email);
 if (error) {
  throw new ValidationError(error.details[0].message);
 }
 return true;
};

export const validatePassword = (password: string) => {
 const schema = Joi.string()
  .pattern(
   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$")
  )
  .required()
  .messages({
   "string.pattern.base":
    "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.",
   "string.empty": "Password cannot be empty.",
   "any.required": "Password is required.",
  });
 const { error } = schema.validate(password);
 if (error) {
  throw new ValidationError(error.details[0].message);
 }
 return true;
};

export const validateId = (id: string, fieldName: string) => {
 if (!id) {
  throw new ValidationError(`${fieldName} cannot be empty`);
 }
 //check if id is a valid ObjectId using mongoose
 if (!mongoose.Types.ObjectId.isValid(id)) {
  throw new ValidationError(`Invalid ${fieldName}`);
 }
};

export const validateEventDetails = (
 title: string,
 description: string,
 date: Date
) => {
 const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
 });
 const { error } = schema.validate({ title, description, date });
 if (error) {
  throw new ValidationError(error.details[0].message);
 }
 return true;
};
