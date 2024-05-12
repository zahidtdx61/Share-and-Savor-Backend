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
  
});

const User = DB.model("User", userSchema);

module.exports = User;
