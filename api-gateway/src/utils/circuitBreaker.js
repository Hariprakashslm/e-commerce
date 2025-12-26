const CircuitBreaker = require("opossum");

const { logger } = require("@hslm/shared");

const createBreaker = (fn, options, serviceName) => {
  const breaker = new CircuitBreaker(fn, options);

  breaker.on("open", () => logger.warn(`${serviceName} circuit opened`));

  breaker.on("halfOpen", () => logger.warn(`${serviceName} circuit half-open`));

  breaker.on("close", () => logger.info(`${serviceName} circuit closed`));

  return breaker;
};

module.exports = createBreaker;
