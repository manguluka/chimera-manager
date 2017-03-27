const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Instructor extends Model {
}

Instructor.configure({
  connection,
  table: 'instructors',
  columns: [
    'eventId',
    'userId',
  ]
})

Instructor.debug = true

module.exports = Instructor
