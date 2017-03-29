module.exports = function requireUserMiddleware() {
  return (req, res, next) => {
    if (req.currentUser) {
      next()
    } else {
      let redirect = '/auth/login'
      if (req.originalUrl) {
        redirect  += `?redirect=${req.originalUrl}`
      }
      req.flash('warning', 'You must be logged in to do that')
      res.redirect(redirect)
    }
  }
}
