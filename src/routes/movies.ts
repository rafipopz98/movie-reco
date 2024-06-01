import express from "express";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie";
import { isAdmin } from "../middleware/isAdmin";
import { limiter } from "../middleware/rateLimit";
import { cacheMiddleware } from "../middleware/checkCache";

export const movieRouter = express.Router();

movieRouter.post("/add", isAdmin, addMovie);
movieRouter.delete("/delete/:id", isAdmin, deleteMovie);
movieRouter.put("/update/:id", isAdmin, updateMovie);
movieRouter.get("/get", limiter, cacheMiddleware, getMovies);
