module.exports = function requireUserMiddleware() {
  return (req, res, next) => {
    if (req.currentUser) {
      next()
    } else {
      req.flash('warning', 'You must be logged in to do that')
      res.redirect('/auth/login')
    }
  }
}
