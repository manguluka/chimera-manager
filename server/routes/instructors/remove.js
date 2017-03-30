const Activity = require('../../models/activity')
const Event = require('../../models/event')
const Instructor = require('../../models/instructor')
const User = require('../../models/user')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function remove(req, res, next) {
  const eventId = Number(req.params.id)
  const userId = Number(req.params.userId)
  console.log('[destroyInstructor] Removing instructor:', { eventId, userId })

  await Instructor.destroy({
    where: {
      eventId: { equals: eventId },
      userId: { equals: userId },
    },
  })
  req.flash('success', 'Removed instructor')
  res.redirect(`/events/${eventId}`)

  // Do this last and don't block on it
  const event = await Event.findOne(eventId)
  const instructor = await User.findOne(userId)
  Activity.record({
    action: 'removed instructor',
    model: event,
    user: res.locals.currentUser,
    extraInfo: {
      instructor,
    }
  })
})

