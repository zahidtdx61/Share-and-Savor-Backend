const { StatusCodes } = require("http-status-codes");
const { Food, User } = require("../models");

const addFood = async (req, res) => {
  const {
    food_name,
    quantity,
    expiry,
    food_image,
    location,
    notes,
    status,
    donner_id,
    uid,
  } = req.body;

  if (donner_id !== uid) {
    return res.status(StatusCodes.FORBIDDEN).send({
      status: "error",
      message: "Forbidden",
    });
  }

  try {
    const donnerInfo = await User.findOne({ uid: donner_id });
    const donner = donnerInfo._id;

    const foodData = {
      food_name,
      quantity,
      expiry,
      food_image,
      location,
      notes,
      status,
      donner,
    };

    const food = await Food.create(foodData);
    await User.findByIdAndUpdate(donner._id, {
      $push: { donated_foods: food._id },
    });

    return res.status(StatusCodes.OK).send({
      status: "success",
      food,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const findFood = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findById(id)
      .populate("donner")
      .populate("requester");

    return res.status(StatusCodes.OK).send({
      status: "success",
      food,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const requestFood = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.body;

  try {
    const userInfo = await User.findOne({ uid });

    const food = await Food.findByIdAndUpdate(id, {
      status: "requested",
      requester: userInfo._id,
    });

    await User.findByIdAndUpdate(userInfo._id, {
      $push: { requested_foods: food._id },
    });

    return res.status(StatusCodes.OK).send({
      status: "success",
      food,
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
  addFood,
  findFood,
  requestFood,
};
