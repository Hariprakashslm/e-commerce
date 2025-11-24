// product-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {setupRateLimit} = require("./utils/ratelimit");

setupRateLimit(app);

app.use(bodyParser.json());

let nextId = 1;
const products = {}; // id -> { id, name, price, qty }

app.get('/', (req, res) => res.send('Product Service OK'));

app.get('/products', (req, res) => {
  res.json(Object.values(products));
});

app.get('/products/:id', (req, res) => {
  const p = products[req.params.id];
  if (!p) return res.status(404).json({ message: 'not found' });
  res.json(p);
});

app.post('/products', (req, res) => {
  const { name, price, qty = 0 } = req.body;
  const id = nextId++;
  products[id] = { id, name, price, qty };
  res.status(201).json(products[id]);
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Product Service listening ${port}`));
