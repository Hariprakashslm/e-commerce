const Joi = require("joi");

exports.initiatePaymentSchema = {
  body: Joi.object({
    orderId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    method: Joi.string().valid("COD", "CARD", "UPI", "NETBANKING").required(),
  }),
};

exports.confirmPaymentSchema = {
  body: Joi.object({
    success: Joi.boolean().required(),
    reason: Joi.when("success", {
      is: false,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
  }),
};
