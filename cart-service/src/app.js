const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cartRoutes = require("./routes/cart.routes");
const { middlewares } = require("@hslm/shared");
const app = express();

app.use(middlewares.correlation);

app.use(middlewares.logging);

app.use(bodyParser.json());

app.get("/health", async (_, res) => {
  const dbState = mongoose.connection.readyState === 1;
  res.status(dbState ? 200 : 503).json({
    status: dbState ? "UP" : "DOWN",
    db: dbState ? "CONNECTED" : "DISCONNECTED",
  });
});

app.use("/cart", cartRoutes);

app.use(middlewares.errorHandler("Cart service error"));

module.exports = app;
