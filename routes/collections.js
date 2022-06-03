const express = require("express");
const router = express.Router();
const {
  addCollection,
  getCollections,
  getProductsbyCollection,
} = require("../controllers/collections");

router.post("/addCollection", addCollection);
router.get("/getCollections", getCollections);
router.get("/getProductsbyCollection/:name", getProductsbyCollection);

module.exports = router;
