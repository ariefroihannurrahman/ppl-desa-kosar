const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://kosarvillage:kosarvillage@cluster0.93sie2d.mongodb.net/kosar";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Sucess");
});

module.exports = mongoose;
