const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const { event, user } = req.body
  const eventId = Number(event)
  const userId = Number(user)

  // amount, user, type, card, checkNumber, memo

  // create attendee
  // create charge

  res.json(req.body)
  //res.redirect(`/charges/new?event=${eventId}`)
})
