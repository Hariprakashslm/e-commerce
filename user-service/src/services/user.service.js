const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");
const { ApiError } = require("@hslm/shared/errors");

const register = async (payload) => {
  const existing = await userRepo.findByEmail(payload.email);
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return userRepo.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });
};

const login = async (payload, jwtSecret) => {
  const user = await userRepo.findByEmail(payload.email);

  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid credentials");
  }

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
    expiresIn: "1h",
  });

  return { token };
};

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

module.exports = {
  register,
  login,
  getProfile,
};
