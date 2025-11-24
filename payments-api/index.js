const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('payments application live');
});

app.listen(3001, () => {
  console.log('payments micro service strated');
});
