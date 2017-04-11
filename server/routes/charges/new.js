const Charge = require('../../models/charge')
const logger = require('../../lib/logger')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  logger.log('debug', '[routes/charges/new] Charge query:', req.query)

  const q = req.query
  const userId = q.user
  const types = Charge.types
  const type = q.type || ''
  const amount = q.amount ? Number(q.amount) : 0.00

  logger.log('info', '[routes/charges/new] Creating charge:', { type, amount, userId })

  let cards
  let user
  let users
  if (req.query.user) {
    user = await User.findOne(userId)
    cards = await user.cards()
  } else {
    users = await User.findMany({
      order: { name: 'asc' },
    })
  }

  res.render('charges/new', {
    amount,
    cards,
    type,
    types,
    user,
    userId,
    users,
  })
})
