import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PORT } from "./src/config/config";
import { connectDB } from "./src/database/connectDB";
import { userRouter } from "./src/routes/user";
import { movieRouter } from "./src/routes/movies";
import { bucketListMovieRouter } from "./src/routes/bucketList";
import { likedMovieRouter } from "./src/routes/liked";
import { watchedMovieRouter } from "./src/routes/watched";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/bucket-list", bucketListMovieRouter);
app.use("/liked", likedMovieRouter);
app.use("/watched", watchedMovieRouter);

connectDB();

app.listen(PORT, () => {
  console.log("listening to http://localhost:8080");
});
