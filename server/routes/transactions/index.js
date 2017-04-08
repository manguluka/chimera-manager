const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'transactions'
  next()
})

router.use(requireStaff())
router.get('/', require('./list'))

module.exports = router
