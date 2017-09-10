/* eslint-disable global-require */

var path = require("path");

if (process.env.NODE_ENV === "production") {
  module.exports = require('./production');
} else {
  module.exports = require('./development');
}

module.exports = Object.assign(require('./defaults'), module.exports);

module.exports.isProd = function() {
  return module.exports.NODE_ENV === "production";
};

module.exports.isDev = function() {
  return module.exports.NODE_ENV === "development";
};
