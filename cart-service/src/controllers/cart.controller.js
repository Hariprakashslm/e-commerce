const cartService = require("../services/cart.service");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.userId);
    res.json(cart || { items: [] });
  } catch (e) {
    next(e);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const cart = await cartService.addItem(
      req.user.userId,
      req.body.productId,
      req.body.qty
    );
    res.json(cart || { items: [] });
  } catch (e) {
    next(e);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(
      req.user.userId,
      req.body.productId
    );
    res.json(cart || { items: [] });
  } catch (e) {
    next(e);
  }
};
