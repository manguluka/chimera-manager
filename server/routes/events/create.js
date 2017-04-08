const Event = require('../../models/event')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async function createEvent(req, res) {

  const fields = Event.toModelFromForm(req.body)
  const event = await Event.create(fields)

  logger.log('info', '[createEvent] Created event:', event)

  res.redirect(`/events/${event.id}`)
})
