module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    var url = req.originalUrl;
    if (url) {
      return res.redirect(`/login?url=${url}`)
    }
    return res.redirect('/login');
  }
  next();
}