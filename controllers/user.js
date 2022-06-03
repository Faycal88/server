const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const product = require("../models/products");
const user = require("../models/user");

function register(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      newUser.save().then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user,
          token: jwt.sign(
            {
              id: user._id,
              email: user.email,
              role: user.role,
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({
        message: "User does not exist",
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      res.status(200).json({
        message: "User logged in successfully",
        token,
        role: user.role,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        cart: user.shop,
        phone: user.phone,
      });
    } else {
      res.status(400).json({
        message: "Password is incorrect",
      });
    }
  });
}

function googlesign(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      const newUser = new User(req.body);
      newUser.save().then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user,
          token: jwt.sign(
            {
              id: user._id,
              email: user.email,
              role: user.role,
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          sign: "google",
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      res.status(200).json({
        message: "User logged in successfully",
        token,
        role: user.role,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        cart: user.shop,
        phone: user.phone,
      });
    }
  });
}

/*   let olduser = "";
  const { email, firstName, lastName, password, token, googleId } = req.body;
  try {
    olduser = User.findOne({ email });
    if (olduser !== null) {
      const token = jwt.sign(
        {
          id: olduser._id,
          role: olduser.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "User logged in successfully",
        token,
        role: olduser.role,
      });
    } else {
      const success = User.create({
        email,
        firstName,
        lastName,
        googleId,
        password,
        role,
      });

      res.status(201).json({
        message: "User created successfully",
        success,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
} */

function facebooksign(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      const newUser = new User(req.body);
      newUser.save().then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user,
          token: jwt.sign(
            {
              id: user._id,
              email: user.email,
              role: user.role,
              sing: "facebook",
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "User logged in successfully",
        token,
        role: user.role,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        cart: user.shop,
        phone: user.phone,
      });
    }
  });
}

function addToCart(req, res) {
  const productId = req.body.add;
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  User.findOne({ _id: decoded.id }).then((user) => {
    if (user) {
      user.shop.push(productId);
      user.save().then((user) => {
        res.status(201).json({
          message: "Product added to cart",
          cart: user.shop,
        });
      });
    } else {
      res.status(400).json({
        message: "User does not exist",
      });
    }
  });
}

function getCart(req, res) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(200).json({
      message: "No token provided",
      cart: [],
    });
    return;
  }
  const decoded = jwt.verify(auth.split(" ")[1], process.env.TOKEN_SECRET);

  User.findOne({ _id: decoded.id })
    .populate("shop")
    .then((user) => {
      res.status(200).json({
        message: "Cart retrieved successfully",
        cart: user.shop,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "User does not exist",
      });
    });
}

function removeFromBag(req, res) {
  const productId = req.body.remove;
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  User.findOne({ _id: decoded.id }).then((user) => {
    if (user) {
      user.shop.pull(productId);
      user.save().then((user) => {
        res.status(201).json({
          message: "Product removed from cart",
          cart: user.shop,
        });
      });
    } else {
      res.status(400).json({
        message: "User does not exist",
      });
    }
  });
}

function updateCredentials(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  User.findByIdAndUpdate(decoded.id, req.body, { new: true }).then((user) => {
    console.log(user);
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Your Creditentials have been updated",
      token,
      role: user.role,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.picture,
      cart: user.shop,
      phone: user.phone,
    });
  });
}

function getUsersList(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  if (decoded.role === "admin") {
    User.find({ role: "user" }).then((users) => {
      const usersList = users.map((user) => {
        return {
          picture: user.picture,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          tel: user.phone,
          address: user.address,
          cart: user.shop,
        };
      });
      res.status(200).json({
        message: "Users list retrieved successfully",
        usersList,
      });
    });
  }
}

function updatePassword(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
  console.log(req.body, decoded);
  if (decoded.sign === "google" || decoded.sign === "facebook") {
    const newPassword = bcrypt.hashSync(req.body.new, 10);
    User.findByIdAndUpdate(
      decoded.id,
      { password: newPassword },
      { new: true }
    ).then((user) => {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "User logged in successfully",
        token,
        role: user.role,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        cart: user.shop,
        phone: user.phone,
      });
    });
  } else {
    User.findById(decoded.id).then((user) => {
      if (bcrypt.compareSync(req.body.old, user.password)) {
        const newPassword = bcrypt.hashSync(req.body.new, 10);
        User.findByIdAndUpdate(
          decoded.id,
          { password: newPassword },
          { new: true }
        ).then((user) => {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              role: user.role,
              sign: "local",
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );

          res.status(200).json({
            message: "User logged in successfully",
            token,
            role: user.role,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture,
            cart: user.shop,
            phone: user.phone,
          });
        });
      } else {
        res.status(400).json({
          message: "Old password is incorrect",
        });
      }
    });
  }
}

/*  const { email, firstName, lastName, password, token, facebookId } = req.body;
  try {
    const olduser = User.findOne({ email });
    if (olduser) {
      const token = jwt.sign(
        {
          id: olduser._id,
          role: olduser.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "User logged in successfully",
        token,
        role: olduser.role,
      });
    }

    const success = User.create({
      email,
      firstName,
      lastName,
      facebookId,
      password,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      success,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
} */

module.exports = {
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
};
