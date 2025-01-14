const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://share-and-savor.web.app",
    "https://share-and-savor.vercel.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
