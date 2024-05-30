import { Request, Response } from "express";
import LikedMovie from "../database/models/liked";

export const toggleLikedMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { movieId } = req.body;

  try {
    const checkUserLikedMovie = await LikedMovie.findOne({ userId, movieId });

    if (checkUserLikedMovie) {
      //if liked remove
      await LikedMovie.deleteOne({ userId, movieId });
      res.status(200).json({ message: "Movie unliked successfully" });
    } else {
      //else like the movie
      const newLikedMovie = new LikedMovie({ userId, movieId });
      await newLikedMovie.save();
      res.status(201).json({ message: "Movie liked successfully" });
    }
  } catch (error) {
    console.error("Error toggling liked movie:", error);
    res.status(500).json({ message: "Error toggling liked movie", error });
  }
};

export const getLikedMovies = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  try {
    const movies = await LikedMovie.find(userId);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error while fetching for liked movie:", error);
    res
      .status(400)
      .json({ message: "Error while fetching for liked movie", error });
  }
};
