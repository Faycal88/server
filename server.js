const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");
/* const https = require("https");
const fs = require("fs"); */
require("dotenv").config();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connnected to the db with success");
  });

const UserRouter = require("./routes/user");
const ArticleRouter = require("./routes/articles");
const ProductRouter = require("./routes/products");
const OrderRouter = require("./routes/orders");
const CollectionRouter = require("./routes/collections");
const CategoryRouter = require("./routes/categories");
const NewsletterRouter = require("./routes/newsletter");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
var jsonparser = bodyParser.json();
app.use(urlencoded({ extended: true }));
app.use(jsonparser);

app.use("/users", UserRouter);
app.use("/articles", ArticleRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);
app.use("/collections", CollectionRouter);
app.use("/categories", CategoryRouter);
app.use("/subscribers", NewsletterRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

/* const httpsServer = https.createServer(
  {
    key: fs.readFileSync("./ssl/key.pem"),
    cert: fs.readFileSync("./ssl/cert.pem"),
  },
  app
); */

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});
