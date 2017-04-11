const connection = require('../lib/db')
const Model = require('simple-sql-model')

class Charge extends Model {

  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() { return `/charges/${this.id}` }
  get stripeUrl() { return `https://dashboard.stripe.com/payments/${this.stripeTransactionId}` }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static get url() { return '/charges' }
}

// Charge types
Charge.CARD = 'card'
Charge.CASH = 'cash'
Charge.CHECK = 'check'
Charge.OTHER = 'other'
Charge.types = [
  Charge.CARD,
  Charge.CASH,
  Charge.CHECK,
  Charge.OTHER,
]

Charge.configure({
  connection,
  table: 'charges',
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

//Charge.debug = true

module.exports = Charge
