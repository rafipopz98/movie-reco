import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PORT } from "./src/config/config";
import { connectDB } from "./src/database/connectDB";
import { userRouter } from "./src/routes/user";
import { movieRouter } from "./src/routes/movies";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/movie", movieRouter);

connectDB();

app.listen(PORT, () => {
  console.log("listening to http://localhost:8080");
});
