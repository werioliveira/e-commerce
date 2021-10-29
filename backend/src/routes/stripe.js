const router = require('express').Router();
const StripeController = require('../controller/StripeController')


router.post("/payment", StripeController.post )


module.exports = router;