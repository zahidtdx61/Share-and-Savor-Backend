const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const router = express.Router();
const zod = require("zod");
const { UserController } = require("../../controllers");

router.post("/add-user", UserController.addUser);

// global catch
router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = router;
