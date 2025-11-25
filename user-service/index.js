const express = require('express');

const app = express();

 
 
const { sequelizeSync } = require('./utils/sequelizeSync'); 
const { setupLogging } = require('../api-gateway/utils/logging');
const { setupBodyParser } = require('../product-service/middleware/bodyParser.middleware');

setupLogging(app);
setupBodyParser(app);
sequelizeSync();
 
app.use("/", require("./routes/user.routes"));
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`User Service listening ${port}`));
