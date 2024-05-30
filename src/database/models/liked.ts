import { Schema, model } from "mongoose";
import { LikedMovieType } from "../../helpers/types";

const likedMovieSchema = new Schema<LikedMovieType>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
});

const LikedMovie = model<LikedMovieType>("LikedMovie", likedMovieSchema);

export default LikedMovie;
