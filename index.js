const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

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

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log("Server is running on port 3000");
});
