const Joi = require("joi");

exports.createProductSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().positive().required(),
    stock: Joi.number().min(0).required(),
    category: Joi.string().required(),
  }),
};

exports.updateProductSchema = {
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().min(0).optional(),
    isActive: Joi.boolean().optional(),
  }),
};
