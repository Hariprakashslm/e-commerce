const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Users application live');
});

app.listen(3001, () => {
  console.log('User micro service strated');
});
