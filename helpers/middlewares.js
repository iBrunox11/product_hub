function mustBeInteger(req, res, next) {
  const sku = req.params.sku
  // need to refactory this
  if (!Number.isInteger(parseInt(sku))) {
    res.status(400).json({ message: 'SKU must be an integer' })
  } else {
    next()
  }
}
function checkFieldsPost(req, res, next) {
  const { sku, name, inventory } = req.body
  if (sku && name && inventory) {
    next()
  } else {
    res.status(400).json({ message: 'fields are not good' })
  }
}
module.exports = {
  mustBeInteger,
  checkFieldsPost
}
