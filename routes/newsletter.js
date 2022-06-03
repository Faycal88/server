const express = require("express");
const { Newsletter } = require("../controllers/newsletter");
const router = express.Router();

router.post("/addSubsriber", Newsletter);

module.exports = router;
