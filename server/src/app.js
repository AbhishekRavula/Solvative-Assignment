import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import peerFivesRouter from "./routes/peerfives.js";
import rewardsRouter from "./routes/rewards.js";
import cors from "cors";

const app = express();

mongoose
  .connect(
    `mongodb+srv://AbhishekRavula:abhishekmongodb@cluster0.mbrefad.mongodb.net/todoApp?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to db!"))
  .catch((err) => {
    console.log("Error connecting to db", err.message);
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/peerfives", peerFivesRouter);
app.use("/rewards", rewardsRouter);

export default app;
