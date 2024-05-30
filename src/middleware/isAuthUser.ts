import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/config";

export const isAuthUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessUserToken;

  if (!token) {
    return res
      .status(401)
      .json({
        message: "Authentication failed: Please log in to access this resource",
      });
  }

  jwt.verify(token, SECRET_TOKEN, (err: any, data: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({
            message:
              "Authentication failed: Your session has expired, please log in again",
          });
      }
      return res
        .status(401)
        .json({
          message: "Authentication failed: Invalid token, please log in again",
        });
    }
    req.user = data;
    next();
  });
};
