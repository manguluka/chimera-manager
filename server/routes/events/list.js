const Event = require('../../models/event')
const wrap = require('express-async-wrapper')

module.exports = wrap(async function home(req, res, next) {
  // TODO: find by date, hide drafts, hide public, etc...

  let query = {
    where: {},
    order: {
      startsAt: 'asc',
    },
  }
  if (req.currentUser) {
    if (!req.currentUser.staff) {
      query.where.draft = false
    }
  } else {
    query.where.draft = false
    query.where.internal = false
  }

  const events = await Event.findMany(query)
  res.render('events/list', { events })
})
