const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
