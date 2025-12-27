const { mongoUri } = require("./env");
const { connectMongo } = require("@hslm/shared").db;

const connectDB = async () => {
  try {
    await connectMongo(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
