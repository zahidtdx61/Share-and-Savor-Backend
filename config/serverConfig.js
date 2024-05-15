const dotenv = require("dotenv");

dotenv.config();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

module.exports = {
  PORT: process.env.PORT,
  COOKIE_OPTIONS: cookieOptions,
};
