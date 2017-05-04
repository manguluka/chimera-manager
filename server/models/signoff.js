const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Signoff extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  //toString() {
    //return this.name
  //}
  //get url() {
    //return `/signoffs/${this.id}`
  //}

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  //static get url() {
    //return '/signoffs'
  //}
}

Signoff.configure({
  connection,
  table: 'signoffs',
  references: {
    resource: {
      model: require('./resource'),
      key: 'resourceId',
    },
    instructor: {
      model: require('./user'),
      key: 'instructorId',
    },
    user: {
      model: require('./user'),
      key: 'userId',
    },
  },
  columns: [
    'id',

    // References
    'userId',
    'instructorId',
    'resourceId',

    // Extra details
    'date',
    'notes',

    // Dates
    'createdAt',
    'updatedAt',
  ],
})

module.exports = Signoff
