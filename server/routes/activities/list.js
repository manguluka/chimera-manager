const Activity = require('../../models/activity')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function list(req, res, next) {
  const activities = await Activity.findMany()
  res.render('activities/list', { activities })
})
