const router = require('express').Router();
const { verifyTokenAndAdmin,verifyTokenAndAuth } = require('../config/auth');
const ProductController = require('../controller/ProductController');


//get all products
router.get('/', ProductController.getAllProducts);
//get product by id
router.get('/:id', ProductController.get);

//endpoint with admin privileges to create, delete and update products
router.post('/', verifyTokenAndAdmin, ProductController.post);
router.put('/:id',verifyTokenAndAdmin, ProductController.put);
router.delete('/:id',verifyTokenAndAdmin, ProductController.delete);

module.exports = router;
