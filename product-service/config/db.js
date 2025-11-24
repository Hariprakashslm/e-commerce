const mongoose = require("mongoose");
const mongoDBConnect = () => {
  mongoose
    .connect(
      process.env.MONGO_INITDB_ROOT_USERNAME &&
        process.env.MONGO_INITDB_ROOT_PASSWORD &&
        process.env.MONGODB_HOST
        ? `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}/?authSource=admin`
        : `mongodb://root:password@localhost:27017/?authSource=admin`
    )
    .then(() => console.log("Mongodb Successfully Connected!"));
};

exports.mongoDBConnect = mongoDBConnect;
