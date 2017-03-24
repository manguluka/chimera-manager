module.exports = function logout(req, res) {
  req.currentUser = null
  req.session.currentUserId = null
  res.locals.currentUser = null
  res.redirect('/')
}
