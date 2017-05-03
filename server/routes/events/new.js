const Event = require('../../models/event')

module.exports = (req, res) => {
  const categories = Event.categories
  const startDay = req.query.start
  res.render('events/new', { categories, startDay })
}
