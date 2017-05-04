const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.section = 'resources'
  next()
})

router.get('/', require('./list'))

module.exports = router
