const router = require('express').Router();
const { verifyTokenAndAuth, verifyToken } = require('../config/auth')
const CartController = require('../controller/CartController')


//create a new cart
router.post('/', verifyToken, CartController.post)

//update extistent cart
router.put('/:id',verifyTokenAndAuth, CartController.put);

//get all Carts
router.get('/', verifyTokenAndAuth, CartController.getAll);

//get Cart by user id
router.get('/:id', verifyTokenAndAuth, CartController.get);

//delete cart by id
router.delete('/:id',verifyTokenAndAuth, CartController.delete);

module.exports = router