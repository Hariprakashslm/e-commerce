const express = require("express");
const router = express.Router();

const serviceHealth = require("../middlewares/serviceHealth.middleware");

const orderProxy = require("../proxies/order.proxy");

router.use("/order", serviceHealth("orderService"), orderProxy);

module.exports = router;
