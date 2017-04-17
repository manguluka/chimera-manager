const Event = require('../../models/event')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const fields = Event.toModelFromForm(req.body)

  logger.log('info', '[updateEvent] Updating event:', {
    event: req.event,
    fields,
    body: req.body,
  })

  const event = await Event.update(req.event.id, fields)

  res.redirect(req.event.url)
})
