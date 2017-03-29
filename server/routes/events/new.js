const Event = require('../../models/event')

module.exports = function newEvent(req, res) {
  const categories = Event.categories
  res.render('events/new', { categories })
}
