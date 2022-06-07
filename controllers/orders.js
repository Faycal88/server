const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const order = require("../models/orders");

function addOrder(req, res) {
  console.log(req.body);
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);

  const {
    name,
    phone,
    address,
    wilaya,
    payment,
    email,
    note,
    products,
    total,
  } = req.body;
  const newOrder = new order({
    user: decoded.id,
    name,
    phone,
    address,
    wilaya,
    payment,
    email,
    note,
    products,
    total,
  });

  newOrder
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Order added successfully",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error occured",
        err,
      });
    });
}

function getOrders(req, res) {
  order
    .find()
    .populate("user")
    .populate("products.product")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error getting orders",
        err,
      });
    });
}

function getUserOrder(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  order
    .find({ user: decoded.id })
    .populate("products.product")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error getting orders",
        err,
      });
    });
}

module.exports = {
  addOrder,
  getOrders,
  getUserOrder,
};
