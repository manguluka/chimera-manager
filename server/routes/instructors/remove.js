const Activity = require('../../models/activity')
const Instructor = require('../../models/instructor')
const logger = require('../../lib/logger')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const userId = Number(req.params.userId)
  logger.log('info', '[destroyInstructor] Removing instructor:', { event: req.event, userId })

  await Instructor.destroy({
    where: {
      eventId: { equals: req.event.id },
      userId: { equals: userId },
    },
  })
  req.flash('success', 'Removed instructor')
  res.redirect(req.event.url)

  // Do this last and don't block on it
  const instructor = await User.findOne(userId)
  Activity.record({
    action: 'removed instructor',
    model: req.event,
    user: res.locals.currentUser,
    extraInfo: {
      instructor,
    }
  })
})

