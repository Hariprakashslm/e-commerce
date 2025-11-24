const ROUTES = [
  {
    url: '/users',
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: process.env.USER_SERVICE
        ? `http://${process.env.USER_SERVICE}:3001`
        : 'http://localhost:3001',
      changeOrigin: true,
    },
  },
  {
    url: '/products',
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: process.env.PRODUCT_SERVICE
        ? `http://${process.env.PRODUCT_SERVICE}:3002`
        : 'http://localhost:3002',
      changeOrigin: true,
    },
  },
  {
    url: '/cart',
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: process.env.CART_SERVICE
        ? `http://${process.env.CART_SERVICE}:3003`
        : 'http://localhost:3003',
      changeOrigin: true,
    },
  },
  {
    url: '/orders',
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: process.env.ORDER_SERVICE
        ? `http://${process.env.ORDER_SERVICE}:3004`
        : 'http://localhost:3004',
      changeOrigin: true,
    },
  },
  {
    url: '/payments',
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: process.env.PAYMENT_SERVICE
        ? `http://${process.env.PAYMENT_SERVICE}:3005`
        : 'http://localhost:3005',

      changeOrigin: true,
    },
  },
];

exports.ROUTES = ROUTES;
