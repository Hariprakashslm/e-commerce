const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const serviceHealth = require("../middlewares/serviceHealth.middleware");

const cartProxy = require("../proxies/cart.proxy");

router.use("/cart", auth, serviceHealth("cartService"), cartProxy);

module.exports = router;
