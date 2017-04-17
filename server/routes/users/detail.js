const Activity = require('../../models/activity')
const Charge = require('../../models/charge')
const User = require('../../models/user')
const wrap = require('express-async-wrapper')

module.exports = wrap(async function detail(req, res) {
  const user = await User.findOne(req.params.id)
  const activities = await Activity.findMany({
    where: { userId: { equals: user.id } },
    order: { createdAt: 'desc' },
  })
  const charges = await Charge.findMany({
    where: { userId: user.id },
    order: { createdAt: 'desc' },
  })
  //const events = await Event.findMany({
    //where: { },
  //})
  res.render('users/detail', { activities, charges, user })
})
