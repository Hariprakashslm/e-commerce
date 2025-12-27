const paymentRepo = require("../repositories/payment.repository");
const { ApiError } = require("@hslm/shared/errors");
const { v4: uuid } = require("uuid");

const initiatePayment = async (userId, payload) => {
  const existing = await paymentRepo.findByOrderId(payload.orderId);
  if (existing) {
    throw new ApiError(409, "Payment already exists for this order");
  }

  return paymentRepo.createPayment({
    userId,
    orderId: payload.orderId,
    amount: payload.amount,
    method: payload.method,
    status: payload.method === "COD" ? "SUCCESS" : "INITIATED",
    transactionId: payload.method === "COD" ? `COD-${uuid()}` : null,
  });
};

const confirmPayment = async (orderId, success, reason) => {
  const payment = await paymentRepo.findByOrderId(orderId);

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  return paymentRepo.updateStatus(payment._id, {
    status: success ? "SUCCESS" : "FAILED",
    transactionId: success ? uuid() : undefined,
    failureReason: success ? undefined : reason,
  });
};

module.exports = {
  initiatePayment,
  confirmPayment,
};
