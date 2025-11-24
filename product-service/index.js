// product-service/index.js
const express = require("express");
const bodyParser = require("body-parser");
const { setupLogging } = require("./middleware/logging.middleware");
const { mongoDBConnect } = require("./config/db");
const { setupBodyParser } = require("./middleware/bodyParser.middleware");
const app = express();

mongoDBConnect();

setupLogging(app);
setupBodyParser(app);

const port = process.env.PORT || 3002;
app.use(bodyParser.json());

app.use("/", require("./routes/product.routes"));

app.listen(port, () => console.log(`Product Service listening ${port}`));
