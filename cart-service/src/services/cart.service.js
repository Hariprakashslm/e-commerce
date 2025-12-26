const cartRepo = require("../repositories/cart.repository");

exports.getCart = async (userId) => {
  return cartRepo.getCart(userId);
};

exports.addItem = async (userId, productId, qty) => {
  if (qty <= 0) throw new Error("Invalid quantity");
  return cartRepo.addItem(userId, productId, qty);
};

exports.removeItem = async (userId, productId) => {
  return cartRepo.removeItem(userId, productId);
};
