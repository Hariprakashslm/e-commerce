const express = require('express');

const app = express();

const { setupLogging } = require('./utils/logging');

const { setupBodyParser } = require('./utils/bodyParser');
const { sequelizeSync } = require('./utils/sequelizeSync'); 

setupLogging(app);
setupBodyParser(app);
sequelizeSync();
 
app.use("/", require("./routes/user.routes"));
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`User Service listening ${port}`));
