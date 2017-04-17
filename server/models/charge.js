const connection = require('../lib/db')
const dollarsToCents = require('dollars-to-cents')
const ExtendableError = require('../lib/extendable-error')
const logger = require('../lib/logger')
const Model = require('simple-sql-model')
const stripe = require('../lib/stripe')

class InvalidAmountError extends ExtendableError {}
class MissingCardError extends ExtendableError {}
class StripeError extends ExtendableError {}

class Charge extends Model {
  //------------------------------------------------
  // Instance methods
  //------------------------------------------------

  get url() {
    return `/charges/${this.id}`
  }
  get stripeChargeUrl() {
    return `https://dashboard.stripe.com/payments/${this.stripeChargeId}`
  }
  get stripeCardUrl() {
    return `https://dashboard.stripe.com/cards/${this.stripeCardId}`
  }
  get amountDollars() {
    return this.amount / 100
  }

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
    logger.log(
      'debug',
      '[Charge.process] Processing transaction:',
      arguments[0]
    )

    const description = 'This is a test'
    amount = dollarsToCents(amount)
    const user = await require('./user').findOne(userId)
    const chargeData = {
      amount,
      memo,
      type,
      userId: user.id,
    }

    if (type === 'card') {
      if (!card) {
        throw new MissingCardError()
      }

      if (!amount || amount < 0.50) {
        throw new InvalidAmountError(amount)
      }

      const charge = await stripe.charges.create({
        amount,
        card,
        currency: 'usd',
        customer: user.stripeCustomerId,
        description,
      })

      logger.log('info', '[Charge.process] Stripe charge:', charge)

      if (charge.failure_code) {
        throw new StripeError(charge.failure_message)
      }

      chargeData.stripeChargeId = charge.id
      chargeData.stripeCardId = card
      chargeData.lastFour = Number(charge.source.last4)
    } else if (type === 'cash') {
      console.log('CASH')
    } else if (type === 'check') {
      console.log('CHECK')
    } else if (type === 'other') {
      console.log('OTHER')
    }

    logger.log('warn', '[Charge.process] Created charge:', chargeData)

    return await this.create(chargeData)
  }

  static get url() {
    return '/charges'
  }
}

// Charge types
Charge.CARD = 'card'
Charge.CASH = 'cash'
Charge.CHECK = 'check'
Charge.OTHER = 'other'
Charge.types = [Charge.CARD, Charge.CASH, Charge.CHECK, Charge.OTHER]

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
    'stripeCardId',
    'type',
    'memo',

    // References
    'userId',

    'createdAt',
    'updatedAt',
  ],
})

Charge.InvalidAmountError = InvalidAmountError
Charge.MissingCardError = MissingCardError
Charge.StripeError = StripeError

//Charge.debug = true

module.exports = Charge
