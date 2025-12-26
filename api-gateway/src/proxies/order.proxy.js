const createHttpClient = require("../utils/httpClient");
const { services } = require("../config");

const orderClient = createHttpClient(services.orderService);

module.exports = async (req, res, next) => {
  try {
    const response = await orderClient({
      method: req.method,
      url: req.originalUrl.replace("/order", ""),
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};
