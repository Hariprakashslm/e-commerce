const Payment = require("../models/payment.model");

const createPayment = (data) => {
  return Payment.create(data);
};

const findByOrderId = (orderId) => {
  return Payment.findOne({ orderId });
};

const updateStatus = (paymentId, update) => {
  return Payment.findByIdAndUpdate(paymentId, update, { new: true });
};

module.exports = {
  createPayment,
  findByOrderId,
  updateStatus,
};
