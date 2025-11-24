const bodyParser = require('body-parser');

const setupBodyParser = (app) => {
  app.use(bodyParser.json());
};

exports.setupBodyParser = setupBodyParser;
