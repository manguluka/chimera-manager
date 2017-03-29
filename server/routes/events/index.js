const express = require('express')
const requireUser = require('../../middleware/require-user')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'events'
  next()
})
router.get('/new', requireUser(), require('./new'))
router.post('/new', requireUser(), require('./create'))
router.get('/:id/edit', requireUser(), require('./edit'))
router.post('/:id/update', requireUser(), require('./update'))
router.get('/:id/cancel', requireUser(), require('./cancel'))
router.get('/:id/instructors/new', requireUser(), require('../instructors/new'))
router.post('/:id/instructors', requireUser(), require('../instructors/create'))
router.post('/:id/instructors/:userId/remove', requireUser(), require('../instructors/remove'))
//router.get('/:id/attendees/new', require('../attendees/new'))
//router.post('/:id/attendees', require('../attendees/create'))
//router.post('/:id/attendees/:userId/refund', require('../attendees/refund'))
router.get('/:id/attend', require('./attend'))
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
