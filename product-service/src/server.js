const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3002;

connectDB();

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
