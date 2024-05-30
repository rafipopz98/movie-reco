import express from "express";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie";
import { isAdmin } from "../middleware/isAdmin";

export const movieRouter = express.Router();

movieRouter.post("/add", isAdmin, addMovie);
movieRouter.delete("/delete/:id", isAdmin, deleteMovie);
movieRouter.put("/update/:id", isAdmin, updateMovie);
movieRouter.get("/get", getMovies);
