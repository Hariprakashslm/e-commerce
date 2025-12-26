const Joi = require("joi");

exports.addItemSchema = {
  body: Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().min(1).required(),
  }),
};
