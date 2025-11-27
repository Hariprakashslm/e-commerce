// product-service/index.js
const express = require("express"); 
const { setupLogging } = require("./middleware/logging.middleware");
const { mongoDBConnect } = require("./config/db");
const { setupBodyParser } = require("./middleware/bodyParser.middleware");
const constants = require("./utils/constants")
const app = express();

mongoDBConnect();

setupLogging(app);
setupBodyParser(app);

const port = constants.PORT;
 

app.use("/", require("./routes/product.routes"));

app.listen(port, () => console.log(`Product Service listening ${port}`));
