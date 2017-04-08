const Activity = require('../../models/activity')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  const event = await req.event.cancel(req.params.id)
  req.flash('success', 'Event cancelled')
  res.redirect(event.url)

  // Do this last and don't block on it
  Activity.record({
    action: 'cancelled',
    model: event,
    user: res.locals.currentUser,
  })
})
