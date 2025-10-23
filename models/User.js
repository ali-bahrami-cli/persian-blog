const mongoose = require("mongoose");
const schema = require("./secure/userValidation");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


UserSchema.statics.validateUser = function (userData) {
  return schema.validate(userData, { abortEarly: false });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
