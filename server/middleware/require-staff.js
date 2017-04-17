module.exports = function requireStaffMiddleware() {
  return (req, res, next) => {
    if (req.currentUser && req.currentUser.staff) {
      next()
    } else {
      let redirect = '/auth/login'
      if (req.originalUrl) {
        redirect += `?redirect=${req.originalUrl}`
      }
      req.flash('warning', 'You must be staff to do that')
      res.redirect(redirect)
    }
  }
}
