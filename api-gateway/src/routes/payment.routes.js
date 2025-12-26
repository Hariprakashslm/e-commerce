const express = require("express");
const router = express.Router();

const serviceHealth = require("../middlewares/serviceHealth.middleware");

const paymentProxy = require("../proxies/payment.proxy");

router.use("/payment", serviceHealth("paymentService"), paymentProxy);

module.exports = router;
