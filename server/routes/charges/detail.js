const Charge = require('../../models/charge')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const chargeId = Number(req.params.id)
  const charge = await Charge.findOne(chargeId)
  res.render('charges/detail', { charge })
})
