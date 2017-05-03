const connection = require('../lib/db')
const Model = require('simple-sql-model')
const User = require('./user')

class Activity extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() {
    return `/activities/${this.id}`
  }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() {
    return '/activities'
  }
  /**
   * A helper utility to create an activity without
   * needing to know the implementation.
   */
  static record({ action, extraInfo = {}, model = null, user = null }) {
    return this.create({
      action,
      extraInfo,
      modelId: model ? model.id : null,
      modelName: model.className,
      userId: user ? user.id : null,
    })
  }

  /**
   * Return all the activities for a given model instance.
   */
  static async forModel(model) {
    const activities = await this.findMany({
      where: {
        modelName: { equals: model.className },
        modelId: { equals: model.id },
      },
      order: { createdAt: 'desc' },
    })

    return await Promise.all(
      activities.map(async activity => {
        activity.user = await User.findOne(activity.userId)
        return activity
      })
    )
  }
}

Activity.configure({
  connection,
  table: 'activities',
  references: {
    user: {
      model: require('./user'),
      key: 'userId',
    },
  },
  columns: [
    'id',
    'action',
    'modelId',
    'modelName',
    'userId',
    'extraInfo',
    'createdAt',
    'updatedAt',
  ],
})

//Activity.debug = true

module.exports = Activity
