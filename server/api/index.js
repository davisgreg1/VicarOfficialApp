const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

router.use((req, res, next) => {
  const error = new Error('Resource Not Found');
  error.status = 404;
  next(error);
});