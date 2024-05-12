const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const router = express.Router();
const zod = require("zod");

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).send({
    message: "API is working fine",
  });
});

router.use("/add", async (req, res) => {
  const { name, email } = req.body;
  const userData = {
    name,
    email,
  };

  try {
    const userSchema = zod.object({
      name: zod.string().min(1),
      email: zod.string().email(),
    });

    const inputValidation = userSchema.parse(userData);

    if (inputValidation) {
      console.log("Input is valid");
    }

    const user = await User.create(userData);
    res.status(StatusCodes.OK).send({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "ZodError") {
      const errorMessages = JSON.parse(error);
      res.status(StatusCodes.BAD_REQUEST).send({
        status: "Invalid input",
        message: errorMessages[0].message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        status: "Something went wrong",
        message: error.message,
      });
    }
  }
});

// global catch
router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = router;
