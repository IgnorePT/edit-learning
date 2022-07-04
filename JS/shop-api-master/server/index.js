const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const apiDocs = require("./swagger.json");
const { Converter } = require("showdown");
const fs = require("fs");
require("colors");

const app = express();
app.use(cors());

const { getProducts, getProduct, getUsers, getUser } = require("./resolvers");

const PORT = process.env.PORT || 5000;

app.get("/api/getProductsList", (req, res) => {
  const params = Object.keys(req.query);
  let result = null;
  if (!params.length) {
    result = getProducts();
  } else {
    result =
      params.length === 1
        ? getProducts(req.query[params[0]])
        : getProducts(req.query[params[0]], req.query[params[1]]);
  }
  return res.status(result.status || 200).send(result);
});
app.get("/api/getProduct", (req, res) => {
  const params = Object.keys(req.query);
  if (!params.length) {
    return res.status(400).send("Please provide an id");
  }
  const { status, data } = getProduct(req.query[params[0]]);
  return res.status(status).send(data);
});
app.get("/api/users", (_, res) => {
  const { status, data } = getUsers();
  return res.status(status).send(data);
});
app.get("/api/login", (req, res) => {
  const params = Object.keys(req.query);
  if (!params.length || params.length < 2) {
    return res.status(400).send("Please provide an userId and password");
  }
  const { status, data } = getUser(req.query[params[0]], req.query[params[1]]);
  return res.status(status).send(data);
});

app.get("/", (_, res) => res.sendFile(path.resolve(`client/index.html`)));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocs));
app.use("/challenge", (_, res) => {
  fs.readFile("Challenge.md", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const html = new Converter().makeHtml(data);
    res.send(html);
  });
});
app.get("/list", (_, res) =>
  res.sendFile(path.resolve(`client/productList.html`))
);
app.get("/product", (_, res) =>
  res.sendFile(path.resolve(`client/product.html`))
);
app.get("/*", (req, res) => res.sendFile(path.resolve(`client/${req.path}`)));

app.listen(PORT, () => {
  console.log(`----------------------------------------------`.blue);
  console.log(`----------------------------------------------`.blue);
  console.log(`     App is ready at http://localhost:${PORT}`.yellow);
  console.log(`----------------------------------------------`.blue);
  console.log(`----------------------------------------------`.blue);
});
