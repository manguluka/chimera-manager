const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const user = await User.findOne(req.params.id)
  const activities = await user.activities()
  const charges = await user.charges()
  const signoffs = await user.signoffs()
  const accessCards = await user.accessCards()
  res.render('users/detail', {
    accessCards,
    activities,
    charges,
    signoffs,
    user,
  })
})
