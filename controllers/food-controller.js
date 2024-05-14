const { StatusCodes } = require("http-status-codes");
const { Food, User } = require("../models");

const addFood = async (req, res) => {
  const {
    food_name,
    quantity,
    expiry_date,
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
      expiry_date,
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
      status: "Requested",
      requester: userInfo._id,
      requested_date: new Date(),
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

const updateFood = async (req, res) => {
  const { id } = req.params;
  const {
    food_name,
    quantity,
    expiry_date,
    food_image,
    location,
    notes,
    status,
    uid,
  } = req.body;

  try {
    const food = await Food.findByIdAndUpdate(id, {
      food_name,
      quantity,
      expiry_date,
      food_image,
      location,
      notes,
      status,
    });

    // console.log({
    //   id,
    //   food_name,
    //   quantity,
    //   expiry_date,
    //   food_image,
    //   location,
    //   notes,
    //   status,
    // });

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

const deleteFood = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.body;

  try {
    const food = await Food.findByIdAndDelete(id);
    await User.findOneAndUpdate({ uid }, { $pull: { donated_foods: id } });

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

const allFoods = async (req, res) => {
  const { search, sorted, page, size } = req.query;

  try {
    let query = {};
    if (search) {
      query = { food_name: { $regex: new RegExp(search, "i") } };
    }

    let foodQuery = Food.find(query);
    if (sorted) {
      foodQuery = foodQuery.sort({ [sorted]: -1 });
    }

    const limit = parseInt(size);
    const skip = (parseInt(page) - 1) * limit;

    // console.log({ limit, skip })
    foodQuery = foodQuery.skip(skip).limit(limit);

    const foods = await foodQuery.exec();

    return res.status(StatusCodes.OK).send({
      status: "success",
      foods,
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
  updateFood,
  deleteFood,
  allFoods,
};
