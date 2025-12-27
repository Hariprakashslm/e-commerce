const express = require("express");
const paymentRoutes = require("./routes/payment.routes");
const { errorHandler } = require("@hslm/shared").middlewares;
const app = express();

app.use(express.json());
app.use("/payments", paymentRoutes);
app.use(errorHandler("Payment service error"));

module.exports = app;
