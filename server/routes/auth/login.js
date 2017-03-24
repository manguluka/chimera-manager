module.exports = function login(req, res) {
  res.locals.section = 'login'
  res.render('auth/login')
}
