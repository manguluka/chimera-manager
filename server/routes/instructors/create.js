const Activity = require('../../models/activity')
const Instructor = require('../../models/instructor')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const userId = req.body.instructor
  await Instructor.create({
    eventId: req.event.id,
    userId,
  })

  req.flash('success', 'Instructor added')
  res.redirect(req.event.url)

  // Do this last and don't block on it
  const instructor = await User.findOne(userId)
  Activity.record({
    action: 'added instructor',
    model: req.event,
    user: res.locals.currentUser,
    extraInfo: {
      instructor,
    },
  })
})

