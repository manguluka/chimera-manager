const express = require('express')
const requireUserMiddleware = require('../../middleware/require-user')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'events'
  next()
})
router.get('/new', requireUserMiddleware(), require('./new'))
router.post('/new', requireUserMiddleware(), require('./create'))
router.get('/:id/edit', requireUserMiddleware(), require('./edit'))
router.post('/:id/update', requireUserMiddleware(), require('./update'))
//router.post('/:id/refund/:userId', require('./refund'))
//router.post('/:id/add-attendee', require('./add-attendee'))
//router.post('/:id/attend', require('./attend'))
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
