const _ = require('lodash')

module.exports = function camelizeObject(fields) {
  return _.reduce(fields, (result, value, key) => {
    result[_.camelCase(key)] = value
    return result
  }, {})
}
