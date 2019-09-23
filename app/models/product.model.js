const filename = '../data/products.json'
let products = require(filename)
const helper = require('../helper.js')
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
    helper.mustBeInArray(products, sku)
      .then(post => resolve(post))
      .catch(err => reject(err))
  })
}
function insertProduct(newProduct) {
  return new Promise((resolve, reject) => {
    const sku = { sku: helper.getNewsku(products) }
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate()
    }
    newProduct = { ...sku, ...date, ...newProduct }
    products.push(newProduct)
    helper.writeJSONFile(filename, products)
    resolve(newProduct)
  })
}
function updateProduct(sku, newProduct) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(products, sku)
      .then(post => {
        const index = products.findIndex(p => p.sku == post.sku)
        sku = { sku: post.sku }
        const date = {
          createdAt: post.createdAt,
          updatedAt: helper.newDate()
        }
        products[index] = { ...sku, ...date, ...newProduct }
        helper.writeJSONFile(filename, products)
        resolve(products[index])
      })
      .catch(err => reject(err))
  })
}
function deleteProduct(sku) {
  return new Promise((resolve, reject) => {
    helper.mustBeInArray(products, sku)
      .then(() => {
        products = products.filter(p => p.sku !== sku)
        helper.writeJSONFile(filename, products)
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
