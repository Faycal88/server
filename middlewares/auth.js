const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secret = process.env.TOKEN_SECRET;

async function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const isCustomAuth = token.lenght < 500;
  let decodedData;

  if (token && isCustomAuth) {
    decodedData = jwt.verify(token, secret);
    req.useId = decodedData?.id;
  } else {
    decodedData = jwt.decode(token);
    const googleId = decodedData?.id.toString();
    const user = await User.findOne({ _id: googleId });
    req.useId = user?._id;
  }
  next();
}

module.exports = {
  auth,
};
