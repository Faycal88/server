const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    default: "",
  },
  lastName: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
  googleId: {
    type: String,
    required: false,
  },
  facebookId: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  picture: {
    type: String,
    required: false,
  },
  shop: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
    required: false,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
