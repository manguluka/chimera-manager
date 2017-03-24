const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function updateEvent(req, res) {
  console.log('[updateEvent] Body:', req.body)

  const id = req.params.id
  const fields = Event.toModelFromForm(req.body)

  await Event.update(id, fields)

  res.redirect(`/events/${id}`)
})
