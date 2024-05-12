const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const router = express.Router();
const zod = require("zod");
const { UserController, FoodController } = require("../../controllers");
const { userDataValidator, foodDataValidator, createJWT, verifyJWT } = require("../../middlewares");

router.post("/sign-up", userDataValidator, createJWT, UserController.addUser);
router.post("/sign-in", createJWT, UserController.signIn);
router.get("/donated-foods", verifyJWT, UserController.donatedFoods);
router.get("/requested-foods", verifyJWT, UserController.requestedFoods);


router.post("/add-food", verifyJWT, foodDataValidator, FoodController.addFood);
router.get("/find-food/:id", verifyJWT, FoodController.findFood);
router.get("/request-food/:id", verifyJWT, FoodController.requestFood);

module.exports = router;
