const config = require('config')

module.exports = function configMiddleware() {
  return (req, res, next) => {
    res.locals.config = {
      APP_NAME: config.get('appName'),
      DEFAULT_FROM_ADDRESS: config.get('emails.defaultFromAddress'),
      ENV: config.get('env'),
      HOST: config.get('host'),
    }
    next()
  }
}
