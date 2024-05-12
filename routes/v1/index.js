const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const router = express.Router();
const zod = require("zod");
const { UserController, FoodController } = require("../../controllers");
const { userDataValidator, foodDataValidator, createJWT } = require("../../middlewares");

router.post("/add-user", userDataValidator, createJWT, UserController.addUser);

router.post("/add-food", foodDataValidator, FoodController.addFood);

module.exports = router;
