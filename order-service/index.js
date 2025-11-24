// order-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();

const {setupRateLimit} = require("./utils/ratelimit");

setupRateLimit(app);

app.use(bodyParser.json());

const SECRET = process.env.JWT_SECRET || 'dev_secret';
let nextOrderId = 1;
const orders = {}; // orderId -> order
const ordersByUser = {}; // userId -> [orderId]

app.get('/', (req, res) => res.send('Order Service OK'));

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

app.post('/orders', auth, async (req, res) => {
  // In real: pull cart, check product availability, reserve stock, etc.
  const userId = req.user.userId;
  const { items = [], total = 0 } = req.body; // client supplies items for PoC
  const id = nextOrderId++;
  const order = { id, userId, items, total, status: 'created', createdAt: new Date() };
  orders[id] = order;
  ordersByUser[userId] = ordersByUser[userId] || [];
  ordersByUser[userId].push(id);

  // publish simple event to Notification Service
  try {
    await axios.post('http://localhost:3006/notify', {
      type: 'order_created',
      payload: { orderId: id, userId, items, total }
    });
  } catch (e) {
    console.warn('notify failed', e.message);
  }

  res.status(201).json(order);
});

app.get('/orders', auth, (req, res) => {
  const userId = req.user.userId;
  const list = (ordersByUser[userId] || []).map(id => orders[id]);
  res.json(list);
});

app.get('/orders/:id', auth, (req, res) => {
  const o = orders[req.params.id];
  if (!o) return res.status(404).json({ message: 'not found' });
  res.json(o);
});

const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Order Service listening ${port}`));
