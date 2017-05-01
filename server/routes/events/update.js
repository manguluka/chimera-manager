const Event = require('../../models/event')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const body = req.body
  let event = req.event
  const fields = Event.toModelFromForm(body)

  logger.log('info', '[updateEvent] Updating event:', {
    event,
    fields,
    body,
  })

  // TODO: handle validation errors
  event = await event.save(fields)

  req.flash('success', 'Event successfully updated!')
  res.redirect(event.url)

  // TODO: This is async but we don't want to block, so don't
  // "await" it.
  await event.sync()
})
