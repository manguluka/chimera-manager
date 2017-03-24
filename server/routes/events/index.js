const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'events'
  next()
})
router.get('/new', require('./new'))
router.post('/new', require('./create'))
router.get('/:id/edit', require('./edit'))
router.post('/:id/update', require('./update'))
//router.post('/:id/refund/:userId', require('./refund'))
//router.post('/:id/add-attendee', require('./add-attendee'))
//router.post('/:id/attend', require('./attend'))
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
