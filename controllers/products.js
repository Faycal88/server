const product = require("../models/products");
const Axios = require("axios");

function addProduct(req, res) {
  const userId = req.useId;
  const { name, description, price, image, quantity, category } = req.body;
  console.log(req.body);

  Axios.post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
    file: image,
    upload_preset: "iqrukcui",
  }).then((response) => {
    const newProduct = new product({
      title: name,
      description,
      price,
      image: response.data.url,
      quantity,
      category,
      creator: userId,
    });
    newProduct
      .save()
      .then((product) => {
        res.status(200).json({
          message: "Product added successfully",
          product,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error adding product",
          err,
        });
      });
  });
}

function getProducts(req, res) {
  product
    .find()
    .then((products) => {
      let shuffled = products
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      res.status(200).json(shuffled);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Products fetching failed",
        err,
      });
    });
}

function getById(req, res) {
  const { id } = req.params;
  product
    .findById(id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function addAndUpdateProduct(req, res) {
  const { id } = req.params;
  const { title, description, price, tags, picture, category, quantity } =
    req.body;
  const upproduct = {
    title,
    description,
    price,
    quantity,
    tags,
    category,
    picture,
    updatedAt: Date.now(),
  };
  console.log(upproduct);
  product
    .findByIdAndUpdate(id, upproduct)
    .then((product) => {
      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error updating product",
        err,
      });
    });
}

function deleteProduct(req, res) {
  const { id } = req.params;
  product
    .findByIdAndDelete(id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  addProduct,
  getProducts,
  getById,
  addAndUpdateProduct,
  deleteProduct,
};
