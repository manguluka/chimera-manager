const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  if (req.currentUser && req.currentUser.staff) {
    next()
  }
  res.redirect('/events')
})
router.use((req, res, next) => {
  res.locals.section = 'dashboard'
  next()
})
router.get('/', require('./dashboard'))

module.exports = router
