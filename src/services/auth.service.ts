import { IAuthData } from "../utils/helpers/validators/validators";
import { User } from "../models/user.model";

export const logIn = async (data: IAuthData) => {
 try {
  const user = await User.findByCredentials(data.email, data.password);
  const token = await user.generateAuthToken();
  return { user, token };
 } catch (error) {
  throw error;
 }
};

export const getUserByEmail = async (email: string) => {
 try {
  return await User.findOne({ email });
 } catch (error) {
  throw error;
 }
};

export const createUser = async (data: IAuthData) => {
 try {
  const user = await User.create({
   ...data,
  });
  return user;
 } catch (error) {
  throw error;
 }
};
