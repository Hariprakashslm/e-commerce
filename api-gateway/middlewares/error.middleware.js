const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errorCode = "GATEWAY_ERROR";

  // Axios errors (downstream services)
  if (err.isAxiosError) {
    if (err.code === "ECONNABORTED") {
      statusCode = 504;
      message = "Service timeout";
      errorCode = "SERVICE_TIMEOUT";
    } else if (err.response) {
      statusCode = err.response.status;
      message = err.response.data?.message || "Service error";
      errorCode = "DOWNSTREAM_ERROR";
    } else {
      statusCode = 503;
      message = "Service unavailable";
      errorCode = "SERVICE_UNAVAILABLE";
    }
  }

  // JWT / Auth errors
  else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized";
    errorCode = "UNAUTHORIZED";
  }

  // Validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
    errorCode = "VALIDATION_ERROR";
  }

  // Log full error internally
  logger.error("API Gateway Error", {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    errorCode,
    stack: err.stack,
  });

  // Send safe response to client
  res.status(statusCode).json({
    success: false,
    message,
    errorCode,
  });
};
