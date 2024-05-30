import { Types } from "mongoose";

export interface UserType {
  email: string;
  password: string;
  isAdmin: boolean;
  likedMovies: string[];
  watchedMovies: string[];
  bucketList: string[];
}

export interface MovieType {
  name: string;
  genres: string[];
}

export interface WatchedMovieType {
  userId: Types.ObjectId;
  movieId: Types.ObjectId;
}

export interface LikedMovieType {
  userId: Types.ObjectId;
  movieId: Types.ObjectId;
}

export interface BucketListMovieType {
  userId: Types.ObjectId;
  movieId: Types.ObjectId;
}
