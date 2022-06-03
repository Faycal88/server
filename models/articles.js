const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
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
  titleOne: {
    type: String,
    required: true,
  },
  contentOne: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  pictureOne: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
    default: ["tag1", "tag2"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  titleTwo: {
    type: String,
    required: false,
  },
  contentTwo: {
    type: String,
    required: false,
  },
  pictureTwo: {
    type: String,
    required: false,
  },
  titleThree: {
    type: String,
    required: false,
  },
  contentThree: {
    type: String,
    required: false,
  },
  pictureThree: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    default: "article",
  },
  productRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: false,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);
