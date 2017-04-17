//const User = require('../../models/event')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async function authenticate(req, res) {
  //const fields = User.toModelFromForm(req.body)
  //const event = await User.create(fields)

  logger.log('info', '[authenticate] Logging in user:', req.body)

  // TODO: actually login
  req.session.currentUserId = 1

  // Redirect them where requested
  let redirect = '/'
  if (req.body.redirect && req.body.redirect !== '/auth/login') {
    redirect = req.body.redirect
  }

  logger.log('debug', '[authenticate] Redirecting to:', redirect)

  res.redirect(redirect)
})
