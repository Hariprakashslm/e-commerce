const Joi = require("joi");

exports.createProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  brand: Joi.string().allow(""),
  rating: Joi.number().min(0).max(5).default(0),
  isActive: Joi.boolean().default(true)
});

exports.updateProduct = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  category: Joi.string(),
  images: Joi.array().items(Joi.string().uri()),
  brand: Joi.string(),
  rating: Joi.number().min(0).max(5),
  isActive: Joi.boolean()
});
