const requestIsHttps = (req) => req.headers['x-forwarded-proto'] !== 'http';

function redirectToHttps(req, res, next) {
  if (!requestIsHttps(req)) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  return next();
}

function blockNonHttps(req, res, next) {
  if (!requestIsHttps(req)) {
    return res.status(404);
  }
  return next();
}

module.exports = {
  redirectToHttps,
  blockNonHttps,
};
