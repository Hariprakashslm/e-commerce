require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,

  jwtSecret: process.env.JWT_SECRET,
  rateLimitWindow: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  rateLimitMax: process.env.RATE_LIMIT_MAX || 100,

  logLevel: process.env.LOG_LEVEL || "info",

  userServiceUrl: process.env.USER_SERVICE_URL,
  productServiceUrl: process.env.PRODUCT_SERVICE_URL,
  cartServiceUrl: process.env.CART_SERVICE_URL,
  orderServiceUrl: process.env.ORDER_SERVICE_URL,
  paymentServiceUrl: process.env.PAYMENT_SERVICE_URL,
};

module.exports = env;
