const Charge = require('../../models/charge')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  const q = req.query
  const userId = q.user
  const types = Charge.types
  const type = q.type || ''
  const amount = q.amount ? Number(q.amount) : 0.00

  let cards
  let user
  let users
  if (req.query.user) {
    user = await User.findOne(userId)
    cards = await user.cards()
  } else {
    users = await User.findMany()
  }

  res.render('charges/new', {
    amount,
    cards,
    type,
    types,
    user,
    users,
  })
})
