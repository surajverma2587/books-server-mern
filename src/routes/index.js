const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/books", async (req, res) => {
  const books = await db.Book.find({}).catch((err) => console.log(err));
  res.json(books);
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const books = await db.Book.findById(id).catch((err) => console.log(err));
  res.json(books);
});

router.post("/books", async (req, res) => {
  const book = req.body;
  const newBook = await db.Book.create({ ...book, date: new Date() });
  res.status(201).json(newBook);
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await db.Book.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
