import { Request, Response } from "express";
import Movie from "../database/models/movies";
import client from "../config/redisClient";

export const addMovie = async (req: Request, res: Response) => {
  const { name, genres } = req.body;
  try {
    const newMovie = new Movie({ name, genres });
    await newMovie.save();
    return res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error("error while adding new movie:", error);
    return res
      .status(400)
      .json({ message: "Error while adding new movie", error });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteMovie = await Movie.findByIdAndDelete(id);
    if (deleteMovie) {
      return res.status(201).json({ message: "Movie deleted successfully" });
    }
    return res.status(404).json({ message: "Movie not found" });
  } catch (error) {
    console.error("error while deleting movie:", error);
    return res
      .status(500)
      .json({ message: "Error while deleting movie", error });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, genres } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { name, genres },
      { new: true }
    );
    if (updatedMovie) {
      return res
        .status(200)
        .json({ message: "Movie updated successfully", movie: updatedMovie });
    }
    return res.status(404).json({ message: "Movie not found" });
  } catch (error) {
    console.error("error while updating movie:", error);
    return res
      .status(400)
      .json({ message: "Error while updating movie", error });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  const { skip, take } = req.query;
  const { genres } = req.body;
  const genresArray =
    typeof genres === "string" ? [genres] : Array.isArray(genres) ? genres : [];
  const skipNumber = parseInt(skip as string);
  const takeNumber = parseInt(take as string);
  // Validate genres input
  if (genresArray.length === 0 || genresArray.length > 3) {
    return res.status(400).json({
      message:
        "Genres input is invalid, At least 1 genre should be added and at most 3",
    });
  }
  //creating a key string to store in cache
  const cacheKey = `movies_${JSON.stringify(
    genresArray
  )}_${skipNumber}_${takeNumber}`;

  try {
    //will be showed if fetched from db, if it fecthes from cache then it wont be printed
    console.log("fetching from DB");
    const query = { genres: { $all: genresArray } };
    const movies = await Movie.find(query).skip(skipNumber).limit(takeNumber);
    // Seting data in cache
    console.log("Setting cache for key:", cacheKey);
    client.setEx(cacheKey, 3600, JSON.stringify(movies)); // Cache for 1 hour
    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

export const setResponse = (genresArray: any, movies: any) => {
  return JSON.parse(genresArray, movies);
};
