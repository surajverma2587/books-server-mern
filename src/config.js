const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost/books";

const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

module.exports = {
  PORT,
  DB_URI,
  MONGOOSE_OPTIONS,
};
