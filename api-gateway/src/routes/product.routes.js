const express = require("express");
const router = express.Router();

const serviceHealth = require("../middlewares/serviceHealth.middleware");

const productProxy = require("../proxies/product.proxy");

router.use("/product", serviceHealth("productService"), productProxy);

module.exports = router;
