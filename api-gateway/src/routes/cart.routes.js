const express = require("express");
const router = express.Router();

const serviceHealth = require("../middlewares/serviceHealth.middleware");

const cartProxy = require("../proxies/cart.proxy");

router.use("/cart", serviceHealth("cartService"), cartProxy);

module.exports = router;
