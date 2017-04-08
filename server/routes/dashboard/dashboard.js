//const Event = require('../../models/event')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  //const fields = Event.toModelFromForm(req.body)
  //const event = await Event.create(fields)

  res.render('dashboard/dashboard', {})
})
