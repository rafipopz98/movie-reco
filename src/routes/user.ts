import express from "express";
import {
  Logout,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/user";
import { isAuthUser } from "../middleware/isAuthUser";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", isAuthUser, userProfile);
userRouter.post("/logout", Logout);
