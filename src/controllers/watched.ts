import { Request, Response } from "express";
import WatchedMovie from "../database/models/watched";

export const togglewatchedMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: movieId } = req.params;

  try {
    const checkWatchedList = await WatchedMovie.findOne({ userId, movieId });

    if (checkWatchedList) {
      //if liked remove
      await WatchedMovie.deleteOne({ userId, movieId });
      res
        .status(200)
        .json({ message: "Movie removed from watched list successfully" });
    } else {
      //else like the movie
      const newWatchedMovie = new WatchedMovie({ userId, movieId });
      await newWatchedMovie.save();
      res
        .status(201)
        .json({ message: "Movie added to watched list successfully" });
    }
  } catch (error) {
    console.error("Error ehilr toggling watched list movie:", error);
    res
      .status(500)
      .json({ message: "Error while toggling watched list movie", error });
  }
};

export const getWatchedMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { skip, take } = req.query;
  const skipNumber = parseInt(skip as string);
  const takeNumber = parseInt(take as string);

  try {
    const movies = await WatchedMovie.find({ userId })
      .skip(skipNumber)
      .limit(takeNumber)
      .populate("movieId");
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error while fetching for liked movie:", error);
    res
      .status(400)
      .json({ message: "Error while fetching for liked movie", error });
  }
};
