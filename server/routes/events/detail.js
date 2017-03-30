const Activity = require('../../models/activity')
const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function detail(req, res) {
  const event = await Event.findOne(req.params.id)
  if (!event) return res.render('404', { event })
  const instructors = await event.instructors()
  const activities = await Activity.forModel(event)
  //const attendees = await event.attendees()
  res.render('events/detail', { activities, event, instructors })
})
