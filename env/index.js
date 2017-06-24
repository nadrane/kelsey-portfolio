/* eslint-disable global-require */

var path = require("path");
var devConfigPath = path.join(__dirname, "./development.js");
var productionConfigPath = path.join(__dirname, "./production.js");
const defaultsConfigPath = path.join(__dirname, "./defaults.js");

if (process.env.NODE_ENV === "production") {
  module.exports = require(productionConfigPath);
} else {
  module.exports = require(devConfigPath);
}

module.exports = Object.assign(module.exports, require(defaultsConfigPath));

module.exports.isProd = function() {
  return module.exports.NODE_ENV === "production";
};

module.exports.isDev = function() {
  return module.exports.NODE_ENV === "development";
};
