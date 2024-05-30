import express from "express";
import { getWatchedMovie, togglewatchedMovie } from "../controllers/watched";
import { isAuthUser } from "../middleware/isAuthUser";

export const watchedMovieRouter = express.Router();

watchedMovieRouter.post("/toggle/:id", isAuthUser, togglewatchedMovie);
watchedMovieRouter.get("/get",isAuthUser,getWatchedMovie)
