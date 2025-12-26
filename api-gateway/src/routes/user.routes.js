const express = require("express");
const router = express.Router();

const serviceHealth = require("../middlewares/serviceHealth.middleware");
const userProxy = require("../proxies/user.proxy");

router.use("/user", serviceHealth("userService"), userProxy);

module.exports = router;
