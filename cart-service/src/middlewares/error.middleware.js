const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error("Gateway error", {
    traceId: req.traceId,
    message: err.message,
  });

  res.status(503).json({
    success: false,
    message: "Service temporarily unavailable",
    traceId: req.traceId,
  });
};
