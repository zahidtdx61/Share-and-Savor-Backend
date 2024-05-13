const { DB } = require("../config");

const foodSchema = new DB.Schema({
  food_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
  requested_date: {
    type: String,
  },
  food_image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  donner: {
    type: DB.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  requester: {
    type: DB.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Food = DB.model("Food", foodSchema);

module.exports = Food;
