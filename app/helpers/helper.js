const fs = require('fs')
const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}
const newDate = () => new Date().toString()
function mustBeInArray(array, SKU) {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.SKU == SKU)
    if (!row) {
      reject({
        message: 'SKU is not good',
        status: 404
      })
    }
    resolve(row)
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
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile
}
