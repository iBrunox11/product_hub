let products = require('../data/products.json')
const helper = require('../helpers/helper')

function getProducts() {
  return new Promise((resolve, reject) => {
    if (products.length === 0) {
      reject({
        message: 'no products available',
        status: 202
      })
    }
    resolve(products)
  })
}

function getProduct(sku) {
  return new Promise((resolve, reject) => {
    helper.getInArray(products, sku)
      .then(post => resolve(post))
      .catch(err => reject(err))
  })
}

/**
 * insert product inside "database" (json file)
 *
 * @param {Object} newProduct contains the product to create
 */
function insertProduct(newProduct) {
  return new Promise((resolve, reject) => {
    if (newProduct && newProduct.sku) {
      helper.checkIfSkuExists(products, newProduct.sku)
        .then(product => {
          const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
          }
          newProduct = { ...date, ...newProduct }

          // delete some fields if exists
          delete newProduct.isMarketable
          delete newProduct.inventory.quantity

          products.push(newProduct)
          helper.writeJSONFile('./data/products.json', products)
          resolve(newProduct)
        })
        .catch(err => reject(err))
    }
  })
}

function updateProduct(sku, newProduct) {
  return new Promise((resolve, reject) => {
    helper.getInArray(products, sku)
      .then(post => {
        const index = products.findIndex(p => p.sku == post.sku)
        sku = { sku: post.sku }
        const date = {
          createdAt: post.createdAt,
          updatedAt: helper.newDate()
        }
        products[index] = { ...sku, ...date, ...newProduct }
        helper.writeJSONFile('./data/products.json', products)
        resolve(products[index])
      })
      .catch(err => reject(err))
  })
}

function deleteProduct(sku) {
  return new Promise((resolve, reject) => {
    helper.getInArray(products, sku)
      .then(() => {
        products = products.filter(p => p.sku !== sku)
        helper.writeJSONFile('./data/products.json', products)
        resolve()
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  insertProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
