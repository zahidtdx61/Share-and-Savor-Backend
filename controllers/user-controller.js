const { ServerConfig } = require("../config");
const serverConfig = require("../config/serverConfig");
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
    const { token } = req.body;

    return res
      .cookie("token", token, serverConfig.COOKIE_OPTIONS)
      .status(StatusCodes.OK)
      .send({
        status: "success",
        user,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const signIn = async (req, res) => {
  const { uid, token } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: "error",
        message: "User not found",
      });
    }

    return res
      .cookie("token", token, ServerConfig.COOKIE_OPTIONS)
      .status(StatusCodes.OK)
      .send({
        status: "success",
        user,
      });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addUser,
  signIn,
};
