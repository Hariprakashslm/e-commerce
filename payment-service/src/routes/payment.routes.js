const express = require("express");
const router = express.Router();

const controller = require("../controllers/payment.controller");
const { validate } = require("@hslm/shared").middlewares;
const {
  initiatePaymentSchema,
  confirmPaymentSchema,
} = require("../validations/payment.validation");

router.post("/", validate(initiatePaymentSchema), controller.initiatePayment);

router.post(
  "/:orderId/confirm",
  validate(confirmPaymentSchema),
  controller.confirmPayment
);

module.exports = router;
