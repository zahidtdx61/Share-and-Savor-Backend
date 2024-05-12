const mongoose = require("mongoose");
const db = mongoose;
const dotenv = require("dotenv");

dotenv.config();

const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

db.connect(URL);


db.connection.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.connection.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
