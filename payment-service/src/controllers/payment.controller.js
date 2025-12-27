const paymentService = require("../services/payment.service");
const { success } = require("@hslm/shared/response");

exports.initiatePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.initiatePayment(
      req.user.userId,
      req.body
    );
    success(res, payment, 201);
  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.confirmPayment(
      req.params.orderId,
      req.body.success,
      req.body.reason
    );
    success(res, payment);
  } catch (err) {
    next(err);
  }
};
