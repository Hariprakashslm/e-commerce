const mongoose = require('mongoose');
const constants = require('../utils/constants');

const mongoDBConnect = () => {
  mongoose
    .connect(constants.MONGO_URL)
    .then(() => console.log('MongoDB Successfully Connected!'))
    .catch((err) => {
      console.error(' DB Error:', err);
      process.exit(1);
    });
};

exports.mongoDBConnect = mongoDBConnect;
