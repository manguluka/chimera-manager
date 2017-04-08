const Event = require('../models/event')
const wrap = require('express-async-wrapper')

module.exports = () => {
  return wrap(async (req, res, next) => {
    if (req.params.eventId) {
      const event = await Event.findOne(req.params.eventId)
      if (!event) return res.render('404')
      req.event = event
      res.locals.event = event
    }
    next()
  })
}
