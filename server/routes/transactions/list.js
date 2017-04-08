const Transaction = require('../../models/transaction')
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res, next) => {
  const transactions = await Transaction.findMany({
    order: { createdAt: 'desc' },
  })
  res.render('transactions/list', { transactions })
})
