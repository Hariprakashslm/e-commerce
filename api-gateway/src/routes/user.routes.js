const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const serviceHealth = require("../middlewares/serviceHealth.middleware");
const userProxy = require("../proxies/user.proxy");

router.use("/user", auth, serviceHealth("userService"), userProxy);

module.exports = router;
