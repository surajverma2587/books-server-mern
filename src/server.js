const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { DB_URI, MONGOOSE_OPTIONS, PORT } = require("./config");
const api = require("./routes/api");
const auth = require("./routes/auth");
const authenticateUser = require("./middlewares/authenticateUser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/auth", auth);

app.use("/api", authenticateUser, api);

app.use("/free", (req, res) => {
  res.json({
    message: "I am free",
  });
});

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
