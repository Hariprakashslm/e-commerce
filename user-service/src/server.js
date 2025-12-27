const app = require("./app");
const { env } = require("./config");
const connectDB = require("./config/db");

const PORT = env.port || 3001;

connectDB();

app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
