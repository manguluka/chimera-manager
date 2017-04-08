const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Transaction extends Model {

  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() { return `/transactions/${this.id}` }
  get stripeUrl() { return `https://dashboard.stripe.com/payments/${this.stripeTransactionId}` }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() { return '/transactions' }
}

// Transaction types
Transaction.CARD = 'card'
Transaction.CASH = 'cash'
Transaction.CHECK = 'check'
Transaction.OTHER = 'other'
Transaction.types = [
  Transaction.CARD,
  Transaction.CASH,
  Transaction.CHECK,
  Transaction.OTHER,
]

Transaction.configure({
  connection,
  table: 'transactions',
  columns: [
    'id',

    // Details
    'lastFour',
    'checkNumber',
    'stripeTransactionId',
    'type',
    'memo',

    'createdAt',
    'updatedAt',
  ],
})

//Transaction.debug = true

module.exports = Transaction
