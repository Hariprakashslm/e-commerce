const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");
const { validate } = require("@hslm/shared").middlewares;
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/product.validation");

router.post("/", validate(createProductSchema), controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.put("/:id", validate(updateProductSchema), controller.updateProduct);

module.exports = router;
