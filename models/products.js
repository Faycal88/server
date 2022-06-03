const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "No description",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    default: "No category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

ProductSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("product", ProductSchema);
