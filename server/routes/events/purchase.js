const config = require('config')
const logger = require('../../lib/logger')
const Event = require('../../models/event')
const wrap = require('express-async-wrapper')

const STRIPE_PRIVATE_KEY = config.get('payments.stripePrivateKey')
const stripe = require('stripe')(STRIPE_PRIVATE_KEY)

module.exports = wrap(async (req, res) => {
  const { body, event, user } = req
  const { email, token } = body

  if (user) {
    logger.log('debug', 'current user:', user)
  } else {
    logger.log('debug', 'need to create account or login')
  }

  logger.log('debug', 'EVENT:', event)
  logger.log('debug', 'TOKEN:', token)
  logger.log('debug', 'EMAIL:', email)

  req.flash('success', 'Successfully signed you up for this event!')
  res.redirect(req.event.url)
})
