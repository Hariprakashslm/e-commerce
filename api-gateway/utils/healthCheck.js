const axios = require("axios");
const logger = require("./logger");

const checkHealth = async (service) => {
  try {
    const res = await axios.get(`${service.baseUrl}${service.healthCheck}`, {
      timeout: 2000,
    });
    return res.status === 200;
  } catch (err) {
    logger.warn(`${service.name} health check failed`);
    return false;
  }
};

module.exports = checkHealth;
