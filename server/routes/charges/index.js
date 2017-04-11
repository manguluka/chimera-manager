const express = require('express')
const requireStaff = require('../../middleware/require-staff')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'charges'
  next()
})

router.use(requireStaff())
router.get('/new', require('./new'))
router.get('/:id', require('./detail'))
router.post('/', require('./create'))
router.get('/', require('./list'))

module.exports = router
