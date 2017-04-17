const Event = require('../../models/event')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  let event
  let eventId
  if (req.query && req.query.event) {
    eventId = Number(req.query.event)
    event = await Event.findOne(eventId)
  }

  const events = await Event.future()
  const users = await User.findMany()

  res.render('attendees/new', { event, eventId, events, users })
})
