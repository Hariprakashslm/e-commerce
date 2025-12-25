const createHttpClient = require("../utils/httpClient");
const createBreaker = require("../utils/circuitBreaker");
const { services } = require("../config");

const userService = services.userService;
const client = createHttpClient(userService);

const requestFn = (req) =>
  client({
    method: req.method,
    url: req.originalUrl.replace("/users", ""),
    data: req.body,
    headers: {
      ...req.headers,
      "x-trace-id": req.traceId,
    },
  });

const breaker = createBreaker(
  requestFn,
  userService.circuitBreaker,
  userService.name
);

module.exports = async (req, res, next) => {
  try {
    const response = await breaker.fire(req);
    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};
