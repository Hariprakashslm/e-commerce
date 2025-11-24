// product-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {setupLogging} = require("./utils/logging");

setupLogging(app);

const port = process.env.PORT || 3002;
app.use(bodyParser.json());
 

app.use("/", require("./routes/product.routes"));
 
app.listen(port, () => console.log(`Product Service listening ${port}`));
