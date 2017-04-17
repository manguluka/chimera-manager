const Instructor = require('../../models/instructor')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const instructors = await Instructor.findMany({
    where: { eventId: { equals: req.event.id } },
  })
  const users = await User.findMany({
    order: { name: 'asc' },
  })
  res.render('instructors/new', { instructors, users })
})
