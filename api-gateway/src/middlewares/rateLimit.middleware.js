const rateLimit = require("express-rate-limit");
const { env } = require("../config");

module.exports = rateLimit({
  windowMs: env.rateLimitWindow,
  max: env.rateLimitMax,
});
