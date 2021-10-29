const router = require('express').Router();
const { verifyTokenAndAuth,verifyTokenAndAdmin } = require('../config/auth')
const UserController = require('../controller/UserController')




router.put('/:id',verifyTokenAndAuth ,UserController.put)
router.delete('/:id',verifyTokenAndAdmin, UserController.delete)
router.get('/find/:id',verifyTokenAndAdmin, UserController.get)
router.get('/find',verifyTokenAndAdmin, UserController.getAllUsers)
router.get('/stats',verifyTokenAndAdmin, UserController.stats)
module.exports = router