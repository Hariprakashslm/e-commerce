const User = require('../models/user.model');

exports.getUserByEmail = (email) => User.findOne({ email });

exports.createUser = (data) => User.create(data);
