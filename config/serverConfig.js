const dotenv = require("dotenv");

dotenv.config();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

module.exports = {
  PORT: process.env.PORT,
  COOKIE_OPTIONS: cookieOptions,
};
