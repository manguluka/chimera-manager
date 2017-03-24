const _ = require('lodash')
const camelcase = require('camelcase')

module.exports = function camelizeObject(fields) {
  return _.reduce(fields, (result, value, key) => {
    result[camelcase(key)] = value
    return result
  }, {})
}
