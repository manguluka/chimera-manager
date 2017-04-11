const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'auth'
  next()
})

router.get('/login', require('./login'))
router.get('/logout', require('./logout'))
router.post('/login', require('./authenticate'))

module.exports = router
