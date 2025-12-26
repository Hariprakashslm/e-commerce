const Joi = require("joi");

/**
 * Order Item Validation
 */
const orderItemSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
});

/**
 * Address Validation
 */
const addressSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  line1: Joi.string().required(),
  line2: Joi.string().optional().allow(""),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().length(6).required(),
  country: Joi.string().default("India"),
});

/**
 * Payment Validation
 */
const paymentSchema = Joi.object({
  method: Joi.string().valid("COD", "CARD", "UPI", "NETBANKING").required(),
  transactionId: Joi.when("method", {
    is: Joi.valid("CARD", "UPI", "NETBANKING"),
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
});

/**
 * Create Order Validation
 */
exports.createOrderSchema = {
  body: Joi.object({
    items: Joi.array().items(orderItemSchema).min(1).required(),

    shippingAddress: addressSchema.required(),

    payment: paymentSchema.required(),

    amount: Joi.object({
      subtotal: Joi.number().positive().required(),
      tax: Joi.number().min(0).default(0),
      shipping: Joi.number().min(0).default(0),
      total: Joi.number().positive().required(),
    }).required(),
  }),
};

/**
 * Update Order Status Validation
 */
exports.updateOrderStatusSchema = {
  params: Joi.object({
    orderId: Joi.string().required(),
  }),
  body: Joi.object({
    status: Joi.string()
      .valid("CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED")
      .required(),
    cancellationReason: Joi.when("status", {
      is: "CANCELLED",
      then: Joi.string().min(5).required(),
      otherwise: Joi.optional(),
    }),
  }),
};
