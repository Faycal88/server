var express = require("express");
var router = express.Router();
const {
  register,
  login,
  googlesign,
  facebooksign,
  addToCart,
  getCart,
  removeFromBag,
  updateCredentials,
  getUsersList,
  updatePassword,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/googlesign", googlesign);
router.post("/facebooksign", facebooksign);
router.patch("/cart", addToCart);
router.get("/getCart", getCart);
router.patch("/removeFromBag", removeFromBag);
router.patch("/updateUser", updateCredentials);
router.get("/getUsersList", getUsersList);
router.patch("/updatePass", updatePassword);

module.exports = router;
