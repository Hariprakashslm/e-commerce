const User = require('../models/user.model');

exports.getUserByEmail = (email) => User.findOne({ where: { email } });

exports.createUser = () => User.find();
