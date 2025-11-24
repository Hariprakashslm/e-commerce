const router = require("express").Router();
const validate = require("../middlewares/validate");

const productController = require("../controllers/product.controller");
const productValidation = require("../validations/product.validation");


app.get('/', (req, res) => res.send('Product Service OK'));

// Admin
router.post("/", validate(productValidation.createProduct), productController.createProduct);
router.put("/:id", validate(productValidation.updateProduct), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id/stock", productController.updateProduct);

// Public
router.get("/", productController.getProducts);
router.get("/search", productController.search);
router.get("/:id", productController.getProduct);

module.exports = router;
