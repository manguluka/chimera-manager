const Charge = require('../../models/charge')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const charges = await Charge.findMany({
    order: { createdAt: 'desc' },
  })

  logger.log('debug', '[routes/charges/list] Charges:', charges)

  res.render('charges/list', { charges })
})
