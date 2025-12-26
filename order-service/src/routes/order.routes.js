const express = require("express");
const router = express.Router();

const cartController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { createOrderSchema } = require("../validations/order.validation");
const { middlewares } = require("@hslm/shared");
/**
 * All order routes are protected
 * Gateway passes JWT → service validates it
 */

// GET /order → get current user's order
router.get("/", authMiddleware, cartController.findByUserId);

// POST /order/items → add item to order
router.post(
  "/",
  authMiddleware,
  middlewares.validate(createOrderSchema),
  cartController.createOrder
);

router.get("/:id", authMiddleware, cartController.findById);

module.exports = router;
