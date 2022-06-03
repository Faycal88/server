const mongoose = require("mongoose");
const slugify = require("slugify");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    default: "No description",
  },
  image: {
    type: String,
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
    required: true,
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

collectionSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Collection", collectionSchema);
