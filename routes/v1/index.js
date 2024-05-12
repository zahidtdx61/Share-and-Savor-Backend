const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const router = express.Router();
const zod = require("zod");
const { UserController } = require("../../controllers");
const { userDataValidator } = require("../../middlewares");

router.post("/add-user", userDataValidator, UserController.addUser);

router.post("/add-food", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Food added" });
});



module.exports = router;
