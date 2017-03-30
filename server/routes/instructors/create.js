const Activity = require('../../models/activity')
const Event = require('../../models/event')
const Instructor = require('../../models/instructor')
const User = require('../../models/user')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function createInstructor(req, res, next) {
  const event = await Event.findOne(req.params.id)
  const userId = req.body.instructor
  await Instructor.create({
    eventId: event.id,
    userId,
  })

  req.flash('success', 'Instructor added')
  res.redirect(`/events/${event.id}`)

  // Do this last and don't block on it
  const instructor = await User.findOne(userId)
  Activity.record({
    action: 'added instructor',
    model: event,
    user: res.locals.currentUser,
    extraInfo: {
      instructor,
    },
  })
})

