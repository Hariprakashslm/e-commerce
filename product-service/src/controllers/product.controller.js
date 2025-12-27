const productService = require("../services/product.service");
const { success } = require("@hslm/shared/response");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    success(res, product, 201);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query);
    success(res, products);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    success(res, product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    success(res, product);
  } catch (err) {
    next(err);
  }
};
