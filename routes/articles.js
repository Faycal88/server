const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getBySlug,
  getForProductPage,
} = require("../controllers/articles");

router.post("/addArticle", createArticle);
router.get("/getArticles", getArticles);
router.get("/getArticleBySlug/:slug", getBySlug);
router.get("/getArticleProduct/:id", getForProductPage);

module.exports = router;
