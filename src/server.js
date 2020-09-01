const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { DB_URI, MONGOOSE_OPTIONS, PORT } = require("./config");
const router = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", router);

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
