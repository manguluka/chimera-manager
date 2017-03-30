const Activity = require('../../models/activity')
const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function cancel(req, res) {
  const event = await Event.cancel(req.params.id)
  req.flash('success', 'Event cancelled')
  res.redirect(event.url)

  // Do this last and don't block on it
  Activity.record({
    action: 'cancelled',
    model: event,
    user: res.locals.currentUser,
    //extraInfo: {
    //},
  })
})
