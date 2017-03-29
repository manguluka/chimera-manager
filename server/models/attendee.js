const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Attendee extends Model {}

Attendee.configure({
  connection,
  table: 'attendees',
  columns: [
    'eventId',
    'userId',
    'createdAt',
    'updatedAt',
  ],
})

//Attendee.debug = true

module.exports = Attendee
