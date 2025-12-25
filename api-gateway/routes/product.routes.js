const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const serviceHealth = require("../middlewares/serviceHealth.middleware");

const productProxy = require("../proxies/product.proxy");

router.use("/product", auth, serviceHealth("productService"), productProxy);

module.exports = router;
