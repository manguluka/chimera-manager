const Instructor = require('../../models/instructor')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function destroyInstructor(req, res, next) {
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
})

