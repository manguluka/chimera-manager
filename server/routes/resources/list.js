const Resource = require('../../models/resource')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const resources = await Resource.findMany({
    order: { name: 'asc' },
  })
  res.render('resources/list', { resources })
})
