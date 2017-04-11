const Charge = require('../../models/charge')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  const { card, type } = req.body

  if (type === 'card' && !card) {
    req.flash('danger', 'You must select a card to charge!')
    console.log(req.originalUrl)
    res.redirect('back')
    return
  }
  const charge = await Charge.process(req.body)

  logger.log('info', '[routes/charges/create] Created charge:', charge)

  res.json({ body: req.body, charge })
})
