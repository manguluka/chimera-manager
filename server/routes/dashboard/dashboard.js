//const Event = require('../../models/event')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function dashboard(req, res) {

  //const fields = Event.toModelFromForm(req.body)
  //const event = await Event.create(fields)

  console.log('[dashboard] Loading dashboard')

  res.render('dashboard/dashboard', {})
})
