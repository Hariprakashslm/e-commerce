const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const serviceHealth = require("../middlewares/serviceHealth.middleware");

const orderProxy = require("../proxies/order.proxy");

router.use("/order", auth, serviceHealth("orderService"), orderProxy);

module.exports = router;
