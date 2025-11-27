const { getUserByEmail ,createUser} = require('../services/user.service');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

const getProfileHandler = async (req, res) => {
  const userEmail = req.user.email;

  const user = await getUserByEmail(userEmail);

  if (!user) return res.status(404).json({ message: 'not found' });
  res.json({ id: user.id, email: user.email, name: user.name });
};

exports.getProfileHandler = getProfileHandler;

async function register(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'email & password required' });

  const userExist = await getUserByEmail(email);

  if (userExist) return res.status(409).json({ message: 'user exists' });
  const passwordHash = await bcrypt.hash(password, 8);
  const user = { email, password: passwordHash, name };

  await createUser(user);

  res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

module.exports.registerHandler = register;

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await getUserByEmail(email);

  if (!currentUser)
    return res.status(401).json({ message: 'invalid credentials' });

  const ok = await bcrypt.compare(password, currentUser.password);

  if (!ok) return res.status(401).json({ message: 'invalid credentials' });

  const token = jwt.sign(
    { userId: currentUser.id, email: currentUser.email },
    JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );

  res.json({ token });
};

exports.loginHandler = loginHandler;
