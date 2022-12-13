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
    origin: ["http://localhost:3000", "https://eternelle-plantes.store","https://6398efb3bbf3fd00092148a0--shimmering-unicorn-81dd37.netlify.app/"],
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

const expressSitemapXml = require("express-sitemap-xml");

app.use(expressSitemapXml(getUrls, "https://eternelle-plantes.store/"));
app.use(expressSitemapXml(getUrls, "https://eternelle-plantes.store/login"));
app.use(expressSitemapXml(getUrls, "https://eternelle-plantes.store/register"));
app.use(expressSitemapXml(getUrls, "https://eternelle-plantes.store/shop"));
app.use(expressSitemapXml(getUrls, "https://eternelle-plantes.store/stores"));
app.use(
  expressSitemapXml(getUrls, "https://eternelle-plantes.store/product/:id")
);

async function getUrls() {
  return await getUrlsFromDatabase();
}

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
