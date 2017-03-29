const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Activity extends Model {}

Activity.configure({
  connection,
  table: 'activities',
  columns: [
    'userId',
    'createdAt',
    'updatedAt',
  ],
})

//Activity.debug = true

module.exports = Activity
