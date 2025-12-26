const express = require("express");
const app = express();
const { middlewares } = require("@hslm/shared");
const routes = require("./src/routes");
app.use(express.json());

app.use(require("./src/middlewares/trace.middleware"));
app.use(middlewares.logging);

app.use(routes);

app.use(middlewares.errorHandler("Gateway error"));

module.exports = app;
