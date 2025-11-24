const router = require("express").Router();

const productController = require("../controllers/product.controller");
const validateMiddleware = require("../middleware/validate.middleware");

const productValidation = require("../validations/product.validation");

const aliveFrom = new Date();

router.get("/health", (req, res) =>
  res.send(`Product Service alive from : ${aliveFrom}`)
);

// Admin
router.post(
  "/",
  validateMiddleware(productValidation.createProduct),
  productController.createProduct
);
router.put(
  "/:id",
  validateMiddleware(productValidation.updateProduct),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id/stock", productController.updateProduct);

// Public
router.get("/", productController.getProducts);
router.get("/search", productController.search);
router.get("/:id", productController.getProduct);

module.exports = router;
