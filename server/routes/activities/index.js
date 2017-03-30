const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'activities'
  next()
})

router.use(requireStaff())
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
