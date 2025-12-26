const Cart = require("../models/cart.model");

exports.getCart = async (userId) => {
  return Cart.findOne({ userId });
};

exports.addItem = async (userId, productId, qty) => {
  return Cart.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $inc: { "items.$.qty": qty } },
    { new: true }
  ).then(async (cart) => {
    if (cart) return cart;

    return Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { productId, qty } } },
      { upsert: true, new: true }
    );
  });
};

exports.removeItem = async (userId, productId) => {
  return Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );
};
