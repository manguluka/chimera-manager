const Activity = require('../../models/activity')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const activities = await req.event.activities()
  const instructors = await req.event.instructors()
  const attendees = await req.event.attendees()
  res.render('events/detail', { activities, attendees, instructors })
})
