import express from "express";
import { getBucketListMovies, toggleBucketListMovie } from "../controllers/bucketList";
import { isAuthUser } from "../middleware/isAuthUser";

export const bucketListMovieRouter = express.Router();

bucketListMovieRouter.post("/toggle/:id", isAuthUser, toggleBucketListMovie);
bucketListMovieRouter.get("/get", isAuthUser, getBucketListMovies);