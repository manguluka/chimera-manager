const express = require('express')

const router = express.Router()

router.get('/login', require('./login'))
router.get('/logout', require('./logout'))
router.post('/login', require('./authenticate'))

module.exports = router
