const { env } = require("../config");

const { auth } = require("@hslm/shared").middlewares;

module.exports = auth(env.jwtSecret);
