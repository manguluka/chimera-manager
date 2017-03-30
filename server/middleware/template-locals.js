const _ = require('lodash')
const config = require('config')
const moment = require('moment')
const pluralize = require('pluralize')

module.exports = function templateLocalsMiddleware() {
  return (req, res, next) => {
    res.locals.config = {
      APP_NAME: config.get('appName'),
      DEFAULT_FROM_ADDRESS: config.get('emails.defaultFromAddress'),
      ENV: config.get('env'),
      HOST: config.get('host'),
    }
    res.locals.currentUser = req.currentUser
    res.locals.currentUrl = req.originalUrl
    res.locals._ = _
    res.locals.moment = moment
    res.locals.pluralize = pluralize

    console.log('[templateLocalsMiddleware] Locals:', {
      config: res.locals.config,
      currentUser: res.locals.currentUser,
      currentUrl: res.locals.currentUrl,
    })

    next()
  }
}
