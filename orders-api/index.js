const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('orders application live');
});

app.listen(3005, () => {
  console.log('orders micro service strated');
});
