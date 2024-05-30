import express from "express";
import { getLikedMovies, toggleLikedMovie } from "../controllers/liked";
import { isAuthUser } from "../middleware/isAuthUser";

export const likedMovieRouter = express.Router();

likedMovieRouter.post("/toggle/:id", isAuthUser, toggleLikedMovie);
likedMovieRouter.get("/get", isAuthUser, getLikedMovies);
