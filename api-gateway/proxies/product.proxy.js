const createHttpClient = require("../utils/httpClient");
const { services } = require("../config");

const productClient = createHttpClient(services.productService);

module.exports = async (req, res, next) => {
  try {
    const response = await productClient({
      method: req.method,
      url: req.originalUrl.replace("/payment", ""),
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};
