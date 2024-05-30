import { Schema, model } from "mongoose";
import { MovieType } from "../../helpers/types";

const movieSchema = new Schema<MovieType>({
  name: { type: String, required: true },
  genres: [{ type: String, required: true }],
});

const Movie = model<MovieType>("Movie", movieSchema);

export default Movie;
