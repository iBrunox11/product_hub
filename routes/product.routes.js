const express = require('express')
const router = express.Router()
const product = require('../models/product.model')
const m = require('../helpers/middlewares')

// Routes
module.exports = router

/* All products */
router.get('/', async (req, res) => {
  await product.getProducts()
    .then(products => res.json(products))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})


/* A product by sku */
router.get('/:sku', m.mustBeInteger, async (req, res) => {
  const sku = req.params.sku
  await product.getproduct(sku)
    .then(product => res.json(product))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

/* Insert a new product */
router.post('/', m.checkFieldsPost, async (req, res) => {
  await product.insertProduct(req.body)
    .then(product => res.status(201).json({
      message: `The product #${product.sku} has been created`,
      content: product
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a product */
router.put('/:sku', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
  const sku = req.params.sku
  await product.updateProduct(sku, req.body)
    .then(product => res.json({
      message: `The product #${product.sku} has been updated`,
      content: product
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    })
})

/* Delete a product */
router.delete('/:sku', m.mustBeInteger, async (req, res) => {
  const sku = req.params.sku

  await product.deleteProduct(sku)
    .then(product => res.json({
      message: `The product #${product.sku} has been deleted`
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    })
})
