const models = require('../../models')
const wrap = require('../../lib/express-async-wrapper')

module.exports = wrap(async function detail(req, res) {
  const activity = await models.Activity.findOne(req.params.id)
  let user
  if (activity.userId) {
    user = await models.User.findOne(activity.userId)
  }
  let model
  if (activity.modelId && activity.modelName) {
    model = await models[activity.modelName].findOne(activity.modeId)
  }
  res.render('activities/detail', { activity, model, user })
})
