const mongoose = require('mongoose');

const mongoDBConnect = () => {
  mongoose
    .connect(
      process.env.MONGO_INITDB_ROOT_USERNAME &&
        process.env.MONGO_INITDB_ROOT_PASSWORD &&
        process.env.MONGODB_HOST
        ? `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}/?authSource=admin`
        : `mongodb://root:password@localhost:27018/?authSource=admin`
    )
    .then(() => console.log('MongoDB Successfully Connected!'))
    .catch((err) => {
      console.error(' DB Error:', err);
      process.exit(1);
    });
};

exports.mongoDBConnect = mongoDBConnect;
