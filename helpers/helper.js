const fs = require('fs')
const getNewSku = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}
const newDate = () => new Date().toString()
function getInArray(array, sku) {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.sku === sku)
    if (!row) {
      reject({
        message: 'SKU is not good',
        status: 404
      })
    }
    resolve(row)
  })
}

function checkIfSkuExists(array, sku) {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.sku === sku)
    if (!row) {
      resolve(row)
    }
    reject({
      message: 'SKU already exists',
      status: 404
    })
  })
}

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}
module.exports = {
  getNewSku,
  newDate,
  getInArray,
  writeJSONFile,
  checkIfSkuExists
}
