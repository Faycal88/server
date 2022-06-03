const express = require("express");
const Article = require("../models/articles");
const Axios = require("axios");
const jwt = require("jsonwebtoken");

async function createArticle(req, res) {
  const Auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(Auth, process.env.TOKEN_SECRET);
  console.log(decoded);
  const {
    title,
    description,
    image,
    titleOne,
    contentOne,
    imageOne,
    titleTwo,
    contentTwo,
    imageTwo,
    titleThree,
    contentThree,
    imageThree,
    productRef,
    type,
    tag,
  } = req.body;
  if (image) {
    Axios.post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
      file: image,
      upload_preset: "iqrukcui",
    })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
      .then((response) => {
        req.body.image = response.data.url;
      });
  }
  if (imageOne) {
    Axios.post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
      file: imageOne,
      upload_preset: "iqrukcui",
    })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
      .then((response) => {
        req.body.imageOne = response.data.url;
      });
  }
  if (imageTwo) {
    Axios.post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
      file: imageTwo,
      upload_preset: "iqrukcui",
    })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
      .then((response) => {
        req.body.imageTwo = response.data.url;
      });
  }
  if (imageThree) {
    Axios.post("https://api.cloudinary.com/v1_1/dakbbymwz/image/upload", {
      file: imageThree,
      upload_preset: "iqrukcui",
    })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
      .then((response) => {
        req.body.imageThree = response.data.url;
      });
  }
  const newArticle = new Article({
    title,
    description,
    mainImage: req.body.image,
    titleOne,
    contentOne,
    pictureOne: req.body.imageOne,
    titleTwo,
    contentTwo,
    pictureTwo: req.body.imageTwo,
    titleThree,
    contentThree,
    pictureThree: req.body.imageThree,
    productRef,
    type,
    tag,
    creator: decoded.id,
  });
  newArticle
    .save()
    .then((article) => {
      res.status(200).json({
        message: "Article added successfully",
        article,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error adding article",
        err,
      });
    });
}

function getArticles(req, res) {
  Article.find()
    .populate("creator")
    .populate("productRef")
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function getlandingArticle(req, res) {
  Article.findOne()
    .populate("creator")
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function getBySlug(req, res) {
  const { slug } = req.params;
  Article.findOne({ slug })
    .populate("creator")
    .populate("productRef")
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function getForProductPage(req, res) {
  const { id } = req.params;
  Article.findOne({ productRef: id })
    .populate("creator")
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  createArticle,
  getArticles,
  getBySlug,
  getForProductPage,
};
