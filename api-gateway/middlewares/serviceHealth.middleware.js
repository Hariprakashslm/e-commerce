const checkHealth = require("../utils/healthCheck");
const { services } = require("../config");

const serviceHealth = (serviceName) => {
  return async (req, res, next) => {
    const service = services[serviceName];

    if (!service) {
      return res.status(500).json({
        success: false,
        message: `Service config not found: ${serviceName}`,
      });
    }

    const healthy = await checkHealth(service);

    if (!healthy) {
      return res.status(503).json({
        success: false,
        message: `${service.name} is unavailable`,
      });
    }

    next();
  };
};

module.exports = serviceHealth;
