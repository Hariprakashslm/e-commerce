const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('products application live');
});

app.listen(3002, () => {
  console.log('product micro service strated');
});
