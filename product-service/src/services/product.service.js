const productRepo = require("../repositories/product.repository");
const { ApiError } = require("@hslm/shared/errors");

const createProduct = async (payload) => {
  return productRepo.create(payload);
};

const getProducts = async (query) => {
  const filter = { isActive: true };

  if (query.category) filter.category = query.category;

  return productRepo.findAll(filter);
};

const getProductById = async (id) => {
  const product = await productRepo.findById(id);

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const updateProduct = async (id, payload) => {
  const product = await productRepo.updateById(id, payload);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const reserveStock = async (productId, qty) => {
  const product = await productRepo.decrementStock(productId, qty);

  if (!product) {
    throw new ApiError(409, "Insufficient stock");
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  reserveStock,
};
