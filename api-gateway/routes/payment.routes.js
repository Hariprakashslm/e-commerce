const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const serviceHealth = require("../middlewares/serviceHealth.middleware");

const paymentProxy = require("../proxies/payment.proxy");

router.use("/payment", auth, serviceHealth("paymentService"), paymentProxy);

module.exports = router;
