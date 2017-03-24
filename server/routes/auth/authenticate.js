//const User = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function authenticate(req, res) {

  //const fields = User.toModelFromForm(req.body)
  //const event = await User.create(fields)

  console.log('[authenticate] Logging in user:', req.body)

  req.session.currentUserId = 1

  res.redirect('/')
})
