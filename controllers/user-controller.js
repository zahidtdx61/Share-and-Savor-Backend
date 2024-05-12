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
    const user = await User.create(userData);
    res.status(StatusCodes.OK).send({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addUser,
};
