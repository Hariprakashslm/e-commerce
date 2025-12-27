const userService = require("../services/user.service");
const { success } = require("@hslm/shared/response");

exports.register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    success(res, user, 201);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body, process.env.JWT_SECRET);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.userId);
    success(res, user);
  } catch (err) {
    next(err);
  }
};
