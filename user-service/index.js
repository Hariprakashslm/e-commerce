require('dotenv').config();
const express = require('express');
const constants = require('./utils/constants');
const app = express();

const { setupLogging } = require('../api-gateway/utils/logging');
const { setupBodyParser } = require('./middleware/bodyParser.middleware');
const { mongoDBConnect } = require('./config/db'); 

setupLogging(app);
setupBodyParser(app);

mongoDBConnect();
process.env
app.use('/', require('./routes/user.routes'));
const port = constants.PORT;

app.listen(port, () => console.log(`User Service listening ${port}`));
