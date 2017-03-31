const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'users'
  next()
})

router.post('/:id/update', requireStaff(), require('./update'))
router.get('/:id/edit', requireStaff(), require('./edit'))
router.get('/:id', requireStaff(), require('./detail'))
router.get('/', requireStaff(), require('./list'))

module.exports = router
