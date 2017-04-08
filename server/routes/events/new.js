const Event = require('../../models/event')

module.exports = (req, res) => {
  const categories = Event.categories
  res.render('events/new', { categories })
}
