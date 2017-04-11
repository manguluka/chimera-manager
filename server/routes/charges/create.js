const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  // type: card, check, cash, other
  // amount, user, type, card, checkNumber, memo
  res.json(req.body)
  //res.redirect(`/transactions/new?event=${eventId}`)
})
