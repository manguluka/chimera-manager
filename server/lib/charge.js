const config = require('config')

//const DEFAULT_FROM_EMAIL = config.get('emails.defaultFromAddress')

module.exports = function charge({
  amount,
}) {
  console.log('CHARGE', amount)
  return Promise.resolve()
}
