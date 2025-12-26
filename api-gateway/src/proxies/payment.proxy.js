const createHttpClient = require("../utils/httpClient");
const { services } = require("../config");

const paymentClient = createHttpClient(services.paymentService);

module.exports = async (req, res, next) => {
  try {
    const response = await paymentClient({
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
