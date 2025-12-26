const express = require("express");
const app = express();

const routes = require("./src/routes");
app.use(express.json());

app.use(require("./src/middlewares/trace.middleware"));
app.use(require("./src/middlewares/logging.middleware"));

app.use(routes);

app.use(require("./src/middlewares/error.middleware"));

module.exports = app;
