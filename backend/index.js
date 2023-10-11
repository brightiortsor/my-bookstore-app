import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Routes
app.use("/books", bookRoutes);

// Connect to MongoDB and start server
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
