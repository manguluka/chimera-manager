const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Attendee extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() {
    return `/attendees/${this.id}`
  }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() {
    return '/attendees'
  }
}

Attendee.configure({
  connection,
  table: 'attendees',
  references: {
    event: {
      model: require('./event'),
      key: 'eventId',
    },
    charge: {
      model: require('./charge'),
      key: 'chargeId',
    },
    user: {
      model: require('./user'),
      key: 'userId',
    },
  },
  columns: [
    'id',

    // References
    'eventId',
    'chargeId',
    'userId',

    'createdAt',
    'updatedAt',
  ],
})

//Attendee.debug = true

module.exports = Attendee
