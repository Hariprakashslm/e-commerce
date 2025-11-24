const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('cart application live');
});

app.listen(3003, () => {
  console.log('cart micro service strated');
});
