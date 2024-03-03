const mongoose = require("mongoose");

const newUser = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  rooms : [String]
});

const User = mongoose.model("User", newUser)
module.exports = User
