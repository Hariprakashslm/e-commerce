const orderRepo = require("../repositories/order.repository");
const { ApiError } = require("@hslm/shared/errors");

const createOrder = async (userId, payload) => {
  if (!payload.items || payload.items.length === 0) {
    throw new ApiError(400, "Order must contain at least one item");
  }

  const order = {
    userId,
    items: payload.items,
    amount: payload.amount,
    shippingAddress: payload.shippingAddress,
    payment: payload.payment,
    status: "CONFIRMED",
  };

  return orderRepo.createOrder(order);
};

const getUserOrders = async (userId) => {
  return orderRepo.findByUserId(userId);
};

const getOrderById = async (orderId, userId) => {
  const order = await orderRepo.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.userId.toString() !== userId) {
    throw new ApiError(403, "Access denied");
  }

  return order;
};

const updateOrderStatus = async (orderId, status, reason) => {
  const exists = await orderRepo.existsById(orderId);

  if (!exists) {
    throw new ApiError(404, "Order not found");
  }

  const extra = status === "CANCELLED" ? { cancellationReason: reason } : {};

  return orderRepo.updateStatus(orderId, status, extra);
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
