const User = require('../../models/user')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function edit(req, res) {
  const user = await User.findOne(req.params.id)
  if (!user) return res.render('404', { user })
  res.render('users/edit', { user })
})
