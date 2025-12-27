const express = require("express");
const productRoutes = require("./routes/product.routes");

const { errorHandler } = require("@hslm/shared").middlewares;

const app = express();

app.use(express.json());
app.use("/products", productRoutes);
app.use(errorHandler("Product service error"));

module.exports = app;
