const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const { addItemSchema } = require("../validations/cart.validation");

/**
 * All cart routes are protected
 * Gateway passes JWT → service validates it
 */

// GET /cart → get current user's cart
router.get("/", authMiddleware, cartController.getCart);

// POST /cart/items → add item to cart
router.post(
  "/items",
  authMiddleware,
  validationMiddleware(addItemSchema),
  cartController.addItem
);

// DELETE /cart/items/:productId → remove item
router.delete("/items/:productId", authMiddleware, cartController.removeItem);

module.exports = router;
