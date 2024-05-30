import { Request, Response } from "express";
import BucketListMovie from "../database/models/bucketlist";

export const toggleBucketListMovie = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: movieId } = req.params;

  try {
    const checkUserBucketListMovie = await BucketListMovie.findOne({
      userId,
      movieId,
    });

    if (checkUserBucketListMovie) {
      //if movie is in bucket list remove
      await BucketListMovie.deleteOne({ userId, movieId });
      res
        .status(200)
        .json({ message: "Movie removed from bucket list successfully" });
    } else {
      //else add to bucket list
      const newBucketListMovie = new BucketListMovie({ userId, movieId });
      await newBucketListMovie.save();
      res
        .status(201)
        .json({ message: "Movie added to the bucket list successfully" });
    }
  } catch (error) {
    console.error("Error while toggling bucketlist movie:", error);
    res.status(400).json({ message: "Error while bucket list movie", error });
  }
};

export const getBucketListMovies = async (req: Request, res: Response) => {
  const { skip, take } = req.query;
  const skipNumber = parseInt(skip as string);
  const takeNumber = parseInt(take as string);
  const { id: userId } = req.user;

  try {
    const movies = await BucketListMovie.find({ userId })
      .skip(skipNumber)
      .limit(takeNumber)
      .populate("movieId");
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error while fetching for bucket list movies:", error);
    res
      .status(400)
      .json({ message: "Error while fetching for bucket list movies", error });
  }
};
