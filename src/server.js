const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models");

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost/books";

const mongooseOptions = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

mongoose.connect(DB_URI, mongooseOptions);

app.get("/books", async (req, res) => {
  const books = await db.Book.find({}).catch((err) => console.log(err));
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
