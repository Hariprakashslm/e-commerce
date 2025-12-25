const router = require('express').Router();

router.use(require('./user.routes'));
router.use(require('./order.routes'));
router.use(require('./payment.routes'));

module.exports = router;
