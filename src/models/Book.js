const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Book = mongoose.model("Book", schema);

module.exports = Book;
