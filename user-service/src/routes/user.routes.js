const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const { validate } = require("@hslm/shared").middlewares;
const {
  registerSchema,
  loginSchema,
} = require("../validations/user.validation");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.get("/profile", auth, controller.profile);

module.exports = router;
