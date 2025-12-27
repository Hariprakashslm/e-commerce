const express = require("express");
const userRoutes = require("./routes/user.routes");
const { errorHandler } = require("@hslm/shared").middlewares;

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler("User service error"));

module.exports = app;
