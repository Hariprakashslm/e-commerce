const constants = {
  MONGO_URL: process.env.MONGO_DB_CONNECTION_URL,
  APP_PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = Object.freeze(constants);
