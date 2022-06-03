const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = express.Router();

router.get("/", getCategories);
router.post("/addCategory", addCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
