//const User = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function authenticate(req, res) {

  //const fields = User.toModelFromForm(req.body)
  //const event = await User.create(fields)

  console.log('[authenticate] Logging in user:', req.body)

  // TODO: actually login
  req.session.currentUserId = 1

  // Redirect them where requested
  let redirect = '/'
  if (req.body.redirect && req.body.redirect !== '/auth/login') {
    redirect = req.body.redirect
  }

  console.log('[authenticate] Redirecting to:', redirect)

  res.redirect(redirect)
})
