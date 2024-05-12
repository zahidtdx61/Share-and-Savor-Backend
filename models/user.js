const { DB } = require("../config");

const userSchema = new DB.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  donated_foods: [
    {
      type: DB.Schema.Types.ObjectId,
      ref: "AvailableFood",
    },
  ],
  requested_foods: [
    {
      type: DB.Schema.Types.ObjectId,
      ref: "RequestedFood",
    },
  ],
});

const User = DB.model("User", userSchema);

module.exports = User;
