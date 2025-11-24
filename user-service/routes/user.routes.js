const router = require('express').Router();
const {
  registerHandler,
  loginHandler,
  getProfileHandler,
} = require('../controller/user.controller'); 
const {
  userSignupSchema,
  userLoginSchema,
} = require('../validations/user.validation');
const { authMiddleware } = require('../utils/authMiddleware');
const validate = require('../utils/validate');

router.get('/', (_, res) => res.send('User Service OK'));

router.post('/register', validate(userSignupSchema), registerHandler);

router.post('/login', validate(userLoginSchema), loginHandler);

router.get('/profile', authMiddleware, getProfileHandler);

module.exports = router;
