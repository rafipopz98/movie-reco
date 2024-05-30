import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DURATION, SECRET_TOKEN } from "../config/config";
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (id: any, email: string, isAdmin: boolean) => {
  return jwt.sign({ id, email, isAdmin }, SECRET_TOKEN, {
    expiresIn: DURATION,
  });
};
