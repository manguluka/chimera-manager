const connection = require('../lib/db')
const Model = require('simple-sql-model')
const stripe = require('../lib/stripe')

class Charge extends Model {

  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() { return `/charges/${this.id}` }
  get stripeUrl() { return `https://dashboard.stripe.com/payments/${this.stripeChargeId}` }
  get amountDollars() { return this.amount / 100 }

  //------------------------------------------------
  // Class methods
  //------------------------------------------------

  static async process({
    amount,
    card,
    checkNumber,
    memo,
    type,
    user: userId,
  }) {

    console.log('PROCESS', arguments)

    const description = 'This is a test'
    amount = Number(amount) * 100
    const user = await require('./user').findOne(userId)
    const chargeData = {
      amount,
      memo,
      type,
      userId: user.id,
    }

    if (type === 'card') {

      const charge = await stripe.charges.create({
        amount,
        card,
        currency: 'usd',
        customer: user.stripeCustomerId,
        description,
      })

      console.log('[Charge.process] Stripe charge:', charge)

      if (charge.failure_code) {
        throw new Error(charge.failure_message)
      }

      chargeData.stripeChargeId = charge.id
      chargeData.lastFour = Number(charge.source.last4)

    } else if (type === 'cash') {
      console.log('CASH')
    } else if (type === 'check') {
      console.log('CHECK')
    } else if (type === 'other') {
      console.log('OTHER')
    }

    return await this.create(chargeData)
  }

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
  references: {
    user: {
      model: require('./user'),
      key: 'userId',
    },
  },
  columns: [
    'id',

    // Details
    'amount',
    'lastFour',
    'checkNumber',
    'stripeChargeId',
    'type',
    'memo',

    // References
    'userId',

    'createdAt',
    'updatedAt',
  ],
})

//Charge.debug = true

module.exports = Charge
