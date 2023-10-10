import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("db is connected!");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
