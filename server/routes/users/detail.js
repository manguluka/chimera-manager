const Activity = require('../../models/activity')
const User = require('../../models/user')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function detail(req, res) {
  const user = await User.findOne(req.params.id)
  const activities = await Activity.findMany({
    where: { userId: { equals: user.id } },
  })
  res.render('users/detail', { activities, user })
})
