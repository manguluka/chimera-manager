const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function home(req, res, next) {
  // TODO: find by date, hide drafts, hide public, etc...

  let query = {}
  if (req.currentUser) {
    if (!req.currentUser.staff) {
      query.draft = false
    }
  } else {
    query.draft = false
    query.internal = false
  }

  const events = await Event.findMany(query)
  res.render('events/list', { events })
})
