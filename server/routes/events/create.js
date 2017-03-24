const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function createEvent(req, res) {

  const fields = Event.toModelFromForm(req.body)
  const event = await Event.create(fields)

  console.log('[createEvent] Created event:', event)

  res.redirect(`/events/${event.id}`)
})
