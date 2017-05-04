const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const users = await User.findMany()
  res.render('users/list', { users })
})
