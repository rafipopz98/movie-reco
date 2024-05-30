import { Schema, model } from "mongoose";
import { WatchedMovieType } from "../../helpers/types";

const watchedMovieSchema = new Schema<WatchedMovieType>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
});

const WatchedMovie = model<WatchedMovieType>(
  "WatchedMovie",
  watchedMovieSchema
);

export default WatchedMovie;
