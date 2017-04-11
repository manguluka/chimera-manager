const Charge = require('../../models/charge')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const charges = await Charge.findMany({
    order: { createdAt: 'desc' },
  })
  res.render('charges/list', { charges })
})
