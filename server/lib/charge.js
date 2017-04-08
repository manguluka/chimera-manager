const config = require('config')
const logger = require('./logger')

//const DEFAULT_FROM_EMAIL = config.get('emails.defaultFromAddress')

module.exports = function charge({
  amount,
}) {
  logger.log('info', 'CHARGE', amount)
  return Promise.resolve()
}
