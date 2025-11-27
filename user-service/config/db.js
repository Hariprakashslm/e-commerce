const mongoose = require('mongoose');

const mongoDBConnect = () => {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_URL)
    .then(() => console.log('MongoDB Successfully Connected!'))
    .catch((err) => {
      console.error(' DB Error:', err);
      process.exit(1);
    });
};

exports.mongoDBConnect = mongoDBConnect;
