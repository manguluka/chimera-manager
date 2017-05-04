const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Resource extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  toString() {
    return this.name
  }
  get url() {
    return `/resources/${this.id}`
  }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() {
    return '/resources'
  }
}

Resource.configure({
  connection,
  table: 'resources',
  columns: [
    'id',

    // Basic details
    'name',
    'description',

    // Dates
    'createdAt',
    'updatedAt',
  ],
})

module.exports = Resource
