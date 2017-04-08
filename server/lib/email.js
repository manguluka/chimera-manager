const config = require('config')
const logger = require('./logger')

const DEFAULT_FROM_EMAIL = config.get('emails.defaultFromAddress')

module.exports = function email({
  to,
  from = DEFAULT_FROM_EMAIL,
  body,
  subject,
}) {
  logger.log('info', 'SEND EMAIL', to, from, subject, body)
  return Promise.resolve()
}
