const connection = require('../lib/db')
const Model = require('simple-sql-model')

class AccessCard extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  toString() {
    return this.number
  }
  get url() {
    return `/access-cards/${this.id}`
  }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() {
    return '/access-cards'
  }
}

AccessCard.configure({
  connection,
  table: 'access_cards',
  references: {
    user: {
      model: require('./user'),
      key: 'userId',
    },
  },
  columns: [
    'id',

    // References
    'userId',

    // Extra details
    'number',

    // Dates
    'createdAt',
    'updatedAt',
  ],
})

module.exports = AccessCard
