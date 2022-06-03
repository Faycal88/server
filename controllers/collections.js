const { default: axios } = require("axios");
const Collection = require("../models/collections");
const jwt = require("jsonwebtoken");

function addCollection(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  const { title, description, image, products } = req.body;
  const newCollection = new Collection({
    name: title,
    description,
    image,
    products,
    creator: decoded.id,
  });

  axios
    .post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
      file: image,
      upload_preset: "iqrukcui",
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
    .then((response) => {
      newCollection.image = response.data.url;
      newCollection
        .save()
        .then((collection) => {
          res.status(200).json({
            message: "Collection added successfully",
            collection,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            message: "Error adding collection",
            err,
          });
        });
    });
}

function getCollections(req, res) {
  Collection.find()
    .populate("products")
    .then((collections) => {
      res.status(200).json(collections);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error getting collections",
        err,
      });
    });
}

function getProductsbyCollection(req, res) {
  const { name } = req.params;
  console.log(req.params);
  Collection.findOne({ name: name })
    .populate("products")
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error getting collection",
        err,
      });
    });
}

module.exports = {
  addCollection,
  getCollections,
  getProductsbyCollection,
};
