const Event = require('../../models/event')
const Instructor = require('../../models/instructor')
const User = require('../../models/user')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function addInstructor(req, res, next) {
  const event = await Event.findOne(req.params.id)
  const instructors = await Instructor.findMany({
    where: { eventId: { equals: event.id } },
  })
  const users = await User.findMany({
    order: { name: 'asc' },
  })
  res.render('instructors/new', { event, instructors, users })
})

