const { v4: uuid } = require("uuid");

module.exports = (req, res, next) => {
  const correlationId = req.headers["x-correlation-id"] || uuid();

  req.correlationId = correlationId;

  res.setHeader("x-correlation-id", correlationId);
  next();
};
