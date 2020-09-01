const mongoose = require("mongoose");

const { MONGOOSE_OPTIONS, DB_URI } = require("../config");
const db = require("../models");
const books = require("./books");

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

db.Book.deleteMany({})
  .then(() => db.Book.collection.insertMany(books))
  .then((data) => {
    console.log(`${data.result.n} records inserted!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
