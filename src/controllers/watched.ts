import { Request, Response } from "express";
import WatchedMovie from "../database/models/watched";

export const togglewatchedMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { movieId } = req.body;

  try {
    const checkUserWatchedMovie = await WatchedMovie.findOne({
      userId,
      movieId,
    });

    if (checkUserWatchedMovie) {
      //if watched remove
      await WatchedMovie.deleteOne({ userId, movieId });
      res.status(200).json({ message: "Movie unliked successfully" });
    } else {
      //else add to watched list
      const newWatchedMovie = new WatchedMovie({ userId, movieId });
      await newWatchedMovie.save();
      res.status(201).json({ message: "Movie liked successfully" });
    }
  } catch (error) {
    console.error("Error toggling liked movie:", error);
    res.status(500).json({ message: "Error toggling liked movie", error });
  }
};

export const getWatchedMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  try {
    const movies = await WatchedMovie.find(userId);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error while fetching for liked movie:", error);
    res
      .status(400)
      .json({ message: "Error while fetching for liked movie", error });
  }
};
