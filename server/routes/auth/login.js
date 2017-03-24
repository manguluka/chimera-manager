module.exports = function login(req, res) {
  res.locals.section = 'login'

  let redirect = '/'
  if (req.query.redirect && req.query.redirect !== '/auth/login') {
    redirect = req.query.redirect
  }

  res.render('auth/login', { redirect })
}
