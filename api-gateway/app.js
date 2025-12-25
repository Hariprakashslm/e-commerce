const express = require("express");
const app = express();

const routes = require("./routes");
app.use(express.json());

app.use(require("./middlewares/trace.middleware"));
app.use(require("./middlewares/logging.middleware"));

app.use(routes);

app.use(require("./middlewares/error.middleware"));

module.exports = app;
