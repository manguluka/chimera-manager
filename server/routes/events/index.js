const express = require('express')
const requireStaff = require('../../middleware/require-staff')
const currentEvent = require('../../middleware/current-event')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'events'
  next()
})

router.get('/new', requireStaff(), require('./new'))
router.post('/new', requireStaff(), require('./create'))
router.get('/:eventId/edit', requireStaff(), currentEvent(), require('./edit'))
router.post('/:eventId/update', requireStaff(), currentEvent(), require('./update'))
router.get('/:eventId/cancel', requireStaff(), currentEvent(), require('./cancel-confirmation'))
router.post('/:eventId/cancel', requireStaff(), currentEvent(), require('./cancel'))
router.get('/:eventId/instructors/new', requireStaff(), currentEvent(), require('../instructors/new'))
router.post('/:eventId/instructors', requireStaff(), currentEvent(), require('../instructors/create'))
router.post('/:eventId/instructors/:userId/remove', requireStaff(), currentEvent(), require('../instructors/remove'))
//router.get('/:eventId/attendees/new', currentEvent(), require('../attendees/new'))
//router.post('/:eventId/attendees', currentEvent(), require('../attendees/create'))
//router.post('/:eventId/attendees/:userId/refund', currentEvent(), require('../attendees/refund'))
router.get('/:eventId/attend', currentEvent(), require('./attend'))
router.post('/:eventId/purchase', currentEvent(), require('./purchase'))
router.get('/:eventId', currentEvent(), require('./detail'))
router.get('/', require('./list'))

module.exports = router
