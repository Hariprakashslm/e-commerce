const express = require('express');

const app = express();

 
 
 
const { setupLogging } = require('../api-gateway/utils/logging');
const { setupBodyParser } = require('./middleware/bodyParser.middleware');
const { mongoDBConnect } = require('./config/db');

setupLogging(app);
setupBodyParser(app);
 
mongoDBConnect() 

app.use("/", require("./routes/user.routes"));
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`User Service listening ${port}`));
