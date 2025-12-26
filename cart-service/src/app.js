const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cartRoutes = require("./routes/cart.routes");
const correlationMiddleware = require("./middlewares/correlation.middleware");

const app = express();

app.use(correlationMiddleware);

app.use(require("./middlewares/logging.middleware"));

app.use(bodyParser.json());

app.use(require("./middlewares/logging.middleware"));

app.get("/health", async (_, res) => {
  const dbState = mongoose.connection.readyState === 1;
  res.status(dbState ? 200 : 503).json({
    status: dbState ? "UP" : "DOWN",
    db: dbState ? "CONNECTED" : "DISCONNECTED",
  });
});

app.use("/cart", cartRoutes);

app.use(require("./middlewares/error.middleware"));

module.exports = app;
