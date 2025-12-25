const express = require("express");
const routes = require("./routes");
const rateLimit = require("./middlewares/rateLimit.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(rateLimit);
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

module.exports = app;
