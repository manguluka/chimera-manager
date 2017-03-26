const _ = require('lodash')

module.exports = function decamelizeObject(fields) {
  return _.reduce(fields, (result, value, key) => {
    result[_.snakeCase(key)] = value
    return result
  }, {})
}
