const logger = require('../../lib/logger')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  logger.log('info', '[routes/user/update] Updating user:', {
    id: req.params.id,
    body: req.body,
  })

  const fields = {
    bio: req.body.bio,
    email: req.body.email,
    name: req.body.name,
    staff: req.body.staff,
  }
  const user = await User.update(req.params.id, fields)

  req.flash('success', 'User updated')
  res.redirect(user.url)
})
