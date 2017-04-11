const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'attendees'
  next()
})

router.use(requireStaff())
router.get('/new', require('./new'))
router.post('/', require('./create'))

module.exports = router
