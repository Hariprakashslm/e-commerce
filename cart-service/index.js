// cart-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const {setupLogging} = require("./utils/logging");

setupLogging(app);

app.use(bodyParser.json());


const port = process.env.PORT || 3003;
const SECRET = process.env.JWT_SECRET || 'dev_secret';
const carts = {}; // userId -> { productId: qty }

app.get('/', (req, res) => res.send('Cart Service OK'));

function auth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'no token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: 'invalid token' });
  }
}

app.get('/cart', auth, (req, res) => {
  const userId = req.user.userId;
  res.json(carts[userId] || {});
});

app.post('/cart/items', auth, (req, res) => {
  const userId = req.user.userId;
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ message: 'productId & qty required' });
  carts[userId] = carts[userId] || {};
  carts[userId][productId] = (carts[userId][productId] || 0) + qty;
  res.json(carts[userId]);
});

app.delete('/cart/items/:productId', auth, (req, res) => {
  const userId = req.user.userId;
  const pid = req.params.productId;
  if (carts[userId]) delete carts[userId][pid];
  res.json(carts[userId] || {});
});
app.listen(port, () => console.log(`Cart Service listening ${port}`));
