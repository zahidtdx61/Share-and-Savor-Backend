const { StatusCodes } = require("http-status-codes");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { SecretsConfig } = require("../config");

const userDataValidator = (req, res, next) => {
  try {
    const { name, email, uid, image } = req.body;
    const userData = {
      email,
      uid,
    };
    const userSchema = zod.object({
      email: zod.string().email(),
      uid: zod.string().min(1),
    });
    userSchema.parse(userData);

    next();
  } catch (error) {
    const errorMessages = JSON.parse(error);
    res.status(StatusCodes.BAD_REQUEST).send({
      status: "Invalid input",
      message: errorMessages[0].message,
    });
  }
};

const foodDataValidator = (req, res, next) => {
  try {
    const {
      food_name,
      quantity,
      expiry_date,
      food_image,
      location,
      notes,
      status,
      donner_id,
    } = req.body;

    const foodData = {
      food_name,
      quantity,
      expiry_date,
      food_image,
      location,
      notes,
      status,
      donner_id,
    };

    const foodSchema = zod.object({
      food_name: zod.string().min(1),
      quantity: zod.number(),
      expiry_date: zod.coerce.date(),
      food_image: zod.string(),
      location: zod.string(),
      notes: zod.string(),
      status: zod.string(),
      donner_id: zod.string().min(1),
    });

    foodSchema.parse(foodData);

    next();
  } catch (error) {
    const errorMessages = JSON.parse(error);
    console.log(error.message);
    res.status(StatusCodes.BAD_REQUEST).send({
      status: "Invalid input",
      message: errorMessages[0].message,
    });
  }
};

const createJWT = (req, res, next) => {
  const { uid } = req.body;
  const token = jwt.sign({ uid }, SecretsConfig.JWT_SECRET, {
    expiresIn: "365d",
  });
  req.body.token = token;
  next();
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, SecretsConfig.JWT_SECRET);
    req.body.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }
};

module.exports = { userDataValidator, foodDataValidator, createJWT, verifyJWT };
