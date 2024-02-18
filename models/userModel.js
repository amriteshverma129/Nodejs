const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userShema);

module.exports = User;
