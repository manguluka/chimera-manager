const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function update(req, res) {

  const id = Number(req.params.id)
  const fields = Event.toModelFromForm(req.body)

  console.log('[updateEvent] Updating event:', { id, fields, body: req.body })

  await Event.update(id, fields)

  res.redirect(`/events/${id}`)
})
