const checkHealth = require("../utils/healthCheck");
const { services } = require("../config");

const serviceHealth = (serviceName) => async (req, res, next) => {
  const service = services[serviceName];
  const healthy = await checkHealth(service);

  if (!healthy) {
    return res.status(503).json({
      success: false,
      message: `${service.name} unavailable`,
    });
  }

  next();
};

module.exports = serviceHealth;
