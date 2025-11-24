const productService = require("../services/product.service");

exports.createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({ success: true, product });
};

exports.getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json({ success: true, products });
};

exports.getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  res.json({ success: true, updated });
};

exports.deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.json({ success: true, message: "Product deleted" });
};

exports.search = async (req, res) => {
  const result = await productService.searchProducts(req.query.q);
  res.json({ success: true, result });
};
