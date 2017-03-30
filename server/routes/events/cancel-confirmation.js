const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function cancel(req, res) {
  const event = await Event.findOne(req.params.id)
  if (!event) return res.render('404', { event })
  res.render('events/cancel', { event })
})
