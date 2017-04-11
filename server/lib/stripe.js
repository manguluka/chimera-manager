const config = require('config')
const STRIPE_PRIVATE_KEY = config.get('payments.stripePrivateKey')
const stripe = require('stripe')(STRIPE_PRIVATE_KEY)

module.exports = stripe
