const logger = require('../lib/logger')
const User = require('../models/user')
const wrap = require('express-async-wrapper')

// If there is a currentUserID in the session, add the full user record
// to the request to make it easily available to routes/views.
module.exports = () => {
  return wrap(async (req, res, next) => {

    logger.log('debug', '[currentUserMiddleware] Current user ID:', req.session.currentUserId)

    if (req.session.currentUserId) {
      try {
        req.currentUser = new User({
          id: 1,
          email: 'dana@chimeraarts.org',
          staff: true,
          name: 'Dana',
        })
        //req.currentUser = await User.readAsync(req.session.currentUserID)
        //if (req.currentUser) req.currentUser.superAdmin = await User.isSuperAdmin(req.currentUser)
      } catch (e) {
        // Ignore a EntityNotFound error. Throw all other errors.
        //if (e.code !== 'Neo.ClientError.Statement.EntityNotFound') {
          throw e
        //}
      }

      // No user found? Clear the login state.
      if (!req.currentUser) {
        req.currentUser = null
        req.session.currentUserId = null
      }
    }

    logger.log('debug', '[currentUserMiddleware] Current user:', req.currentUser)

    next()
  })
}
