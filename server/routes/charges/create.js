const Charge = require('../../models/charge')
const logger = require('../../lib/logger')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {

  try {

    const { amount, card, type } = req.body
    const charge = await Charge.process(req.body)

    logger.log('info', '[routes/charges/create] Created charge:', charge)

    res.json({ body: req.body, charge })

  } catch (err) {

    if (err instanceof Charge.InvalidAmountError) {
      req.flash('danger', 'You must charge the card at least $.50!')
      return res.redirect('back')
    }

    if (err instanceof Charge.MissingCardError) {
      req.flash('danger', 'You must select a card to charge!')
      return res.redirect('back')
    }

    throw err

  }
})
