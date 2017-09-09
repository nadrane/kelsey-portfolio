const fs = require("bluebird").promisifyAll(require("fs"));
const path = require("path");
const { isDev, isProd } = require("../env/");
const chalk = require("chalk");
var PrettyError = require("pretty-error");
const prettyError = new PrettyError();

function getJSON({ logLevel, message, type, err }, ...args) {
  return JSON.stringify(
    {
      logLevel,
      message,
      type,
      ...args
    },
    null,
    4
  );
}

function debug({ message, type }, ...args) {
  const debugJSON = getJSON({ message, type, logLevel: "debug" }, ...args);
  if (isProd()) {
    return fs.appendFileAsync(path.resolve(__dirname, "./logs/debug.txt"), debugJSON);
  } else {
    console.info(chalk.yellow(debugJSON));
  }
}

function logError({ message, type, err }, ...args) {
  const errorJSON = getJSON({ message, type, err, logLevel: "error" }, ...args);
  if (isProd()) {
    if (err) {
      errorJSON.err = {
        message: err.message,
        stack: err.stack
      };
    }
    return fs.appendFileAsync(path.resolve(__dirname, "./logs/errors.txt"), errorJSON);
  } else {
    console.error(prettyError.render(err));
    console.error(chalk.red(errorJSON));
  }
}

module.exports = {
  logError,
  debug
};
