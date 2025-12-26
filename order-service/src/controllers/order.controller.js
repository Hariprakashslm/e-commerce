const orderService = require("../services/order.service");
const { success } = require("@hslm/shared/response");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.userId, req.body);
    success(res, order, 201);
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(
      req.params.id,
      req.user.userId
    );
    success(res, order, 201);
  } catch (err) {
    next(err);
  }
};

exports.findByUserId = async (req, res, next) => {
  try {
    const order = await orderService.getUserOrders(req.user.userId);
    success(res, order, 201);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.body.orderId,
      req.body.status,
      req.body.reason
    );
    success(res, order, 201);
  } catch (err) {
    next(err);
  }
};
