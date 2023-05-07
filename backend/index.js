const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/assets/uploads", express.static(path.resolve(__dirname, "assets", "uploads")));
app.use("/", require("./src/routes"));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`server running on ${PORT}`); });

module.exports = app;
