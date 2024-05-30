import { Request, Response } from "express";
import User from "../database/models/user";
import { comparePassword, generateToken, hashPassword } from "../helpers/utils";
import { COOKIE_TOKEN } from "../config/config";

export const userRegister = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser._id, newUser.email, newUser.isAdmin);
    res.cookie(COOKIE_TOKEN, token, {
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.log("error while regestring new user", error);
    return res.status(400).json({ message: "Error registering user", error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please Register" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.email, user.isAdmin);

    // Set cookie with secure options
    res.cookie(COOKIE_TOKEN, token, {
      httpOnly: true,
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("error while regestring new user", error);
    return res.status(400).json({ message: "Error logging in", error });
  }
};

export const Logout = (req: Request, res: Response) => {
  // Clear the existing cookie
  return res
    .clearCookie(COOKIE_TOKEN, {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out successfully");
};

export const userProfile = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const profile = await User.findById(id);
    if (profile) {
      const { password, ...others }: any = profile.toObject();
      return res.status(200).json(others);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log("error while fetching user profile", error);
    return res
      .status(400)
      .json({ message: "error while fetching user profile", error });
  }
};
