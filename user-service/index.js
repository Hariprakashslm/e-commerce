// user-service/index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();

const {setupLogging} = require("./utils/logging");

setupLogging(app);

app.use(bodyParser.json());

const SECRET = process.env.JWT_SECRET || 'dev_secret';
const users = {}; // email -> { id, email, passwordHash, name }
let idCounter = 1;

app.get('/', (req, res) => res.send('User Service OK'));

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email & password required' });
  if (users[email]) return res.status(409).json({ message: 'user exists' });
  const passwordHash = await bcrypt.hash(password, 8);
  const user = { id: idCounter++, email, passwordHash, name };
  users[email] = user;
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user) return res.status(401).json({ message: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'invalid credentials' });
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '8h' });
  res.json({ token });
});

function authMiddleware(req, res, next) {
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

app.get('/profile', authMiddleware, (req, res) => {
  const userEmail = req.user.email;
  const u = users[userEmail];
  if (!u) return res.status(404).json({ message: 'not found' });
  res.json({ id: u.id, email: u.email, name: u.name });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`User Service listening ${port}`));
