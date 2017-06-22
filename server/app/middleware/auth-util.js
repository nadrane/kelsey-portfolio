const { AuthorizationError } = require('../errors');

const adminOnly = (req, res, next) => {
  if (!req.session.admin) {
    next(new AuthorizationError('You are not authorized to make this request'));
  }
  next();
}

module.exports.adminOnly = adminOnly;