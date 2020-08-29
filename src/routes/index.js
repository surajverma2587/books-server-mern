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

module.exports = router;
