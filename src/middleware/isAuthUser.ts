import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/config";
export const isAuthUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessUserToken;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  jwt.verify(token, SECRET_TOKEN, async (err: any, data: any) => {
    if (err) return res.status(403).send({ message: "Please login again" });
    req.user = data;
    next();
  });
};
