const newsletter = require("../models/newsletter");

function Newsletter(req, res) {
  console.log(req.body);
  const newNewsletter = new newsletter({
    email: req.body.email,
  });
  newNewsletter
    .save()
    .then((newsletter) => {
      res.status(201).json({
        message: "Newsletter added successfully",
        newsletter,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "you are already subscribed",
        error: err,
      });
    });
}

module.exports = {
  Newsletter,
};
