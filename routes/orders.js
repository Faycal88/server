const express = require("express");
const router = express.Router();

const { addOrder, getOrders, getUserOrder } = require("../controllers/orders");
const { auth } = require("../middlewares/auth");

router.post("/addOrder", auth, addOrder);
router.get("/getOrders", auth, getOrders);
router.get("/user", auth, getUserOrder);

module.exports = router;
