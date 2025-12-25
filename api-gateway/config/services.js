const env = require("./env");

module.exports = {
  cartService: {
    name: "cart-service",
    baseUrl: env.cartServiceUrl,
    timeout: 5000,
    retries: 2,
    healthCheck: "/health",
    circuitBreaker: {
      timeout: 6000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    },
  },

  orderService: {
    name: "order-service",
    baseUrl: env.orderServiceUrl,
    timeout: 5000,
    retries: 2,
    healthCheck: "/health",
    circuitBreaker: {
      timeout: 6000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    },
  },

  paymentService: {
    name: "payment-service",
    baseUrl: env.paymentServiceUrl,
    timeout: 5000,
    retries: 2,
    healthCheck: "/health",
    circuitBreaker: {
      timeout: 6000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    },
  },

  productService: {
    name: "product-service",
    baseUrl: env.productServiceUrl,
    timeout: 5000,
    retries: 2,
    healthCheck: "/health",
    circuitBreaker: {
      timeout: 6000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    },
  },

  userService: {
    name: "user-service",
    baseUrl: env.userServiceUrl,
    timeout: 5000,
    retries: 2,
    healthCheck: "/health",
    circuitBreaker: {
      timeout: 6000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    },
  },
};
