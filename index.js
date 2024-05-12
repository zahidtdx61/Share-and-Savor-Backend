const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://share-and-savor.web.app/",
  ],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
