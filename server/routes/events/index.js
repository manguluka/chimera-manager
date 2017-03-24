const express = require('express')

const router = express.Router()

router.get('/new', require('./new'))
router.post('/new', require('./create'))
router.get('/:id/edit', require('./edit'))
router.post('/:id/update', require('./update'))
router.get('/:id', require('./detail'))
router.get('/', require('./list'))

module.exports = router
