const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  addAndUpdateProduct,
  getById,
  deleteProduct,
} = require("../controllers/products");
const { auth } = require("../middlewares/auth");

router.post("/addProduct", auth, addProduct);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getById);
router.patch("/findEditProduct/:id", auth, addAndUpdateProduct);
router.delete("/deleteProduct/:id", auth, deleteProduct);
router.get;
/* router.get("/", getProducts);
router.post("/addAndUpdate", addAndUpdateProduct);
router.post("/delete", deleteProduct); */

module.exports = router;
