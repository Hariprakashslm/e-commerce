const axios = require("axios");
const axiosRetry = require("axios-retry").default;

const createHttpClient = (service) => {
  const client = axios.create({
    baseURL: service.baseUrl,
    timeout: service.timeout,
  });

  axiosRetry(client, {
    retries: service.retries,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) =>
      error.code === "ECONNABORTED" ||
      (error.response && error.response.status >= 500),
  });

  return client;
};

module.exports = createHttpClient;
