class AuthorizationError extends Error() {
  constructor() {
    super();
    this.status = 401;
  }
}

module.exports.AuthorizationError = AuthorizationError;
