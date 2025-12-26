const Order = require("../models/order.model");

const createOrder = (data) => {
  return Order.create(data);
};

const findById = (orderId) => {
  return Order.findById(orderId);
};

const findByUserId = (userId) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

const updateStatus = (orderId, status, extra = {}) => {
  return Order.findByIdAndUpdate(orderId, { status, ...extra }, { new: true });
};

const existsById = (orderId) => {
  return Order.exists({ _id: orderId });
};

module.exports = {
  createOrder,
  findById,
  findByUserId,
  updateStatus,
  existsById,
};
