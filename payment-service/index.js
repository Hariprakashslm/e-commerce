// payment-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const {setupLogging} = require("./utils/logging");
const port = process.env.PORT || 3005;
setupLogging(app);

app.use(bodyParser.json());

let nextPaymentId = 1;
const payments = {};

app.get('/', (req, res) => res.send('Payment Service OK'));

app.post('/payments', (req, res) => {
  const { orderId, amount, method } = req.body;
  const id = nextPaymentId++;
  const p = { id, orderId, amount, method, status: 'pending' };
  payments[id] = p;

  // Simulate async payment completion by calling callback endpoint (in real use webhooks)
  setTimeout(async () => {
    payments[id].status = 'completed';
    try {
      await axios.post('http://localhost:3004/payment-callback', { paymentId: id, orderId, status: 'completed' });
    } catch (e) {
      console.warn('order callback failed', e.message);
    }
  }, 1000);

  res.status(201).json(p);
});

app.post('/payments/callback', (req, res) => {
  const { paymentId, status } = req.body;
  if (!payments[paymentId]) return res.status(404).json({ message: 'payment not found' });
  payments[paymentId].status = status;
  res.json(payments[paymentId]);
});

app.post('/payment-callback', (req, res) => {
  const { paymentId, orderId, status } = req.body;
  // find order and mark paid
  const o = orders[orderId];
  if (!o) return res.status(404).json({ message: 'order not found' });
  o.payment = { paymentId, status };
  if (status === 'completed') o.status = 'paid';
  res.json(o);
});



app.listen(port, () => console.log(`Payment Service listening ${port}`));
