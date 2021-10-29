const router = require('express').Router();
const { verifyTokenAndAuth,verifyTokenAndAdmin, verifyToken } = require('../config/auth')
const OrderController = require('../controller/OrderController')


//create a new Order
router.post('/', verifyToken, OrderController.post)

//update extistent Order
router.put('/:id',verifyTokenAndAdmin, OrderController.put);

//get all Orders
router.get('/', verifyTokenAndAdmin, OrderController.getAll);

//get Order by user id
router.get('/:id', verifyTokenAndAuth, OrderController.get);

//delete Order by id
router.delete('/:id',verifyTokenAndAdmin, OrderController.delete);

//show income month
router.get('/income',verifyTokenAndAdmin, OrderController.monthIncome);

module.exports = router