const { StatusCodes } = require("http-status-codes");
const zod = require("zod");

const userDataValidator = (req, res, next) => {
  try {
    const { name, email, uid, image } = req.body;
    const userData = {
      name,
      email,
      uid,
      image,
    };
    const userSchema = zod.object({
      name: zod.string().min(1),
      email: zod.string().email(),
      uid: zod.string().min(1),
      image: zod.string(),
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
    const { food_name, quantity, expiry, food_image, location, notes, status, donner, requester } = req.body;
    const foodData = {
      food_name,
      quantity,
      expiry,
      food_image,
      location,
      notes,
      status,
      donner_id,
    };
    const foodSchema = zod.object({
      food_name: zod.string().min(1),
      quantity: zod.number().min(1),
      expiry: zod.string(),
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
    res.status(StatusCodes.BAD_REQUEST).send({
      status: "Invalid input",
      message: errorMessages[0].message,
    });
  }
}

module.exports = { userDataValidator };
