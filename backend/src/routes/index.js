const router = require('express').Router();

const user = require('./user');
const auth = require('./auth');
const product = require('./product');
const cart = require('./cart');
const order = require('./order');
const stripe = require('./stripe');

router.use('/user', user);
router.use('/user', auth);
router.use('/products', product);
router.use('/cart', cart);
router.use('/orders', order);
router.use('/checkout',stripe)

module.exports = router;
