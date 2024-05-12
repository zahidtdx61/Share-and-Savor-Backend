const zod = require("zod");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");

const addUser = async (req, res) => {
  const { name, email, uid, image } = req.body;
  const userData = {
    name,
    email,
    uid,
    image,
  };

  try {
    const userSchema = zod.object({
      name: zod.string().min(1),
      email: zod.string().email(),
      uid: zod.string().min(1),
      image: zod.string(),
    });

    userSchema.parse(userData);

    const user = await User.create(userData);
    res.status(StatusCodes.OK).send({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error.message);
    if (error.name === "ZodError") {
      const errorMessages = JSON.parse(error);
      res.status(StatusCodes.BAD_REQUEST).send({
        status: "Invalid input",
        message: errorMessages[0].message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};

module.exports = {
  addUser,
};
