const express = require('express')
const router = express.Router()
module.exports = router
router.use('/api/v1/products', require('./product.routes'))
