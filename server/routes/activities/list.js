const Activity = require('../../models/activity')
const wrap = require('express-async-wrapper')

module.exports = wrap(async function list(req, res, next) {
  const activities = await Activity.findMany({
    order: { createdAt: 'desc' },
  })
  res.render('activities/list', { activities })
})
