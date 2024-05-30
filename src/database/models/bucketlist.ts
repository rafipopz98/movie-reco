import { Schema, model } from "mongoose";
import { BucketListMovieType } from "../../helpers/types";

const bucketListMovieSchema = new Schema<BucketListMovieType>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
});

const BucketListMovie = model<BucketListMovieType>(
  "BucketListMovie",
  bucketListMovieSchema
);

export default BucketListMovie;
