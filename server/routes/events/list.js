const Event = require('../../models/event')

module.exports = async function home(req, res, next) {
  try {
    const events = await Event.findMany()
    console.log(events)
    res.render('events/list', { events })
  } catch (err) {
    next(err)
  }
}
