const logger = require('../lib/logger')
const User = require('../models/user')
const wrap = require('express-async-wrapper')

// If there is a currentUserID in the session, add the full user record
// to the request to make it easily available to routes/views.
module.exports = () => {
  return wrap(async (req, res, next) => {
    logger.log(
      'debug',
      '[currentUserMiddleware] Current user ID:',
      req.session.currentUserId
    )

    if (req.session.currentUserId) {
      try {
        // TODO THIS IS TEMPORARY!
        req.currentUser = await User.findOne({
          where: {
            email: { equals: 'dana@chimeraarts.org' },
          },
        })
      } catch (e) {
        // TODO catch not found?
        throw e
      }

      // No user found? Clear the login state.
      if (!req.currentUser) {
        req.currentUser = null
        req.session.currentUserId = null
      }
    }

    logger.log(
      'debug',
      '[currentUserMiddleware] Current user:',
      req.currentUser
    )

    next()
  })
}
