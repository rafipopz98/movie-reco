import { Request, Response, NextFunction } from "express";
import client from "../config/redisClient";
export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { skip, take } = req.query;
  const skipNumber = parseInt(skip as string);
  const takeNumber = parseInt(take as string);
  const { genres } = req.body;
  const genresArray =
    typeof genres === "string" ? [genres] : Array.isArray(genres) ? genres : [];
  const cacheKey = `movies_${JSON.stringify(
    genresArray
  )}_${skipNumber}_${takeNumber}`;

  try {
    const data = await client.get(cacheKey);
    if (data) {
      return res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  } catch (err) {
    console.error("Redis error:", err);
    next();
  }
};
