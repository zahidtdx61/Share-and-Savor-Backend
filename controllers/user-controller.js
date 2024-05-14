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
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create(userData);
    }
    const { token } = req.body;

    return res.cookie("token", token, serverConfig.COOKIE_OPTIONS).send({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
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
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const donatedFoods = async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ uid: uid }).populate("donated_foods");
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: "error",
        message: "User not found",
      });
    }

    const donatedFoods = user.donated_foods;

    return res.status(StatusCodes.OK).send({
      status: "success",
      donated_foods: donatedFoods,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const requestedFoods = async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ uid: uid }).populate("requested_foods");
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: "error",
        message: "User not found",
      });
    }

    const requestedFoods = user.requested_foods;

    return res.status(StatusCodes.OK).send({
      status: "success",
      requested_foods: requestedFoods,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(StatusCodes.OK).send({
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

module.exports = {
  addUser,
  signIn,
  donatedFoods,
  requestedFoods,
  findUser,
};
