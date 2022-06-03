const category = require("../models/categories");

// get all categories
function addCategory(req, res) {
  const newCategory = new category({
    name: req.body.name,
  });

  console.log(req.body);
  newCategory
    .save()
    .then((category) => {
      res.status(201).json({
        message: "Category added successfully",
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function getCategories(req, res) {
  category
    .find()
    .then((categories) => {
      res.status(200).json({
        categories: categories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

function deleteCategory(req, res) {
  const { id } = req.params;
  category
    .findByIdAndDelete(id)
    .then((category) => {
      res.status(200).json({
        message: "Category deleted successfully",
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};
