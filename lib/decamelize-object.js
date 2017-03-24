const _ = require('lodash')
const decamelize = require('decamelize')

module.exports = function decamelizeObject(fields) {
  return _.reduce(fields, (result, value, key) => {
    result[decamelize(key)] = value
    return result
  }, {})
}
