const createHttpClient = require("../utils/httpClient");
const { services } = require("../config");

const userClient = createHttpClient(services.userService);

module.exports = async (req, res, next) => {
  try {
    const response = await userClient({
      method: req.method,
      url: req.originalUrl.replace("/users", ""),
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};
