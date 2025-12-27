require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3004,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
};
