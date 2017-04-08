const logger = require('../../lib/logger')

module.exports = function logout(req, res) {
  req.currentUser = null
  req.session.currentUserId = null
  res.locals.currentUser = null

  let redirect = '/'
  if (req.query.redirect && req.query.redirect !== '/auth/logout') {
    redirect = req.query.redirect
  }

  logger.log('info', '[logout] Logging out and redirecting to:', redirect)

  res.redirect(redirect)
}
