const createHttpClient = require("../utils/httpClient");
const { services } = require("../config");

const cartClient = createHttpClient(services.cartService);

module.exports = async (req, res, next) => {
  try {
    const response = await cartClient({
      method: req.method,
      url: req.originalUrl.replace("/cart", ""),
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};
