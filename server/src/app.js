import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect(
    `mongodb+srv://AbhishekRavula:abhishekmongodb@cluster0.mbrefad.mongodb.net/todoApp?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to db!"))
  .catch((err) => {
    console.log("Error connecting to db", err.message);
  });

export default app;
