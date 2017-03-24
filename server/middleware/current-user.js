//const User = require('../models/user')
const wrap = require('../lib/express-async-wrapper')

// If there is a currentUserID in the session, add the full user record
// to the request to make it easily available to routes/views.
module.exports = function currentUserMiddleware() {
  return wrap(async (req, res, next) => {

    console.log('[currentUserMiddleware] Current user ID:', req.session.currentUserId)

    if (req.session.currentUserId) {
      try {
        req.currentUser = { id: 1, staff: true, name: 'Dana' }
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

    console.log('[currentUserMiddleware] Current user:', req.currentUser)

    next()
  })
}
