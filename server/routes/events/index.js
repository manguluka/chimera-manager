const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'events'
  next()
})

router.get('/new', requireStaff(), require('./new'))
router.post('/new', requireStaff(), require('./create'))
router.get('/:id/edit', requireStaff(), require('./edit'))
router.post('/:id/update', requireStaff(), require('./update'))
router.get('/:id/cancel', requireStaff(), require('./cancel-confirmation'))
router.post('/:id/cancel', requireStaff(), require('./cancel'))
router.get('/:id/instructors/new', requireStaff(), require('../instructors/new'))
router.post('/:id/instructors', requireStaff(), require('../instructors/create'))
router.post('/:id/instructors/:userId/remove', requireStaff(), require('../instructors/remove'))
//router.get('/:id/attendees/new', require('../attendees/new'))
//router.post('/:id/attendees', require('../attendees/create'))
//router.post('/:id/attendees/:userId/refund', require('../attendees/refund'))
router.get('/:id/attend', require('./attend'))
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
