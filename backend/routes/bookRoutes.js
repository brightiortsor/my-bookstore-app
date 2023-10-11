import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//get all books route
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//get book by id route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update book route
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete book route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update book route
router.post("/", async (req, res) => {
  try {
    const books = await Book.create(req.body);
    res.status(201).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
