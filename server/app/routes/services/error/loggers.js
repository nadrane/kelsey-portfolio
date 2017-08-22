const fs = require("bluebird").promisifyAll(require("fs"));
const path = require("path");

function logError({ message, type }) {
  return fs.appendFileAsync(
    path.resolve("../../../../logs/errors.txt"),
    JSON.stringify({
      message,
      type
    })
  );
}

module.exports = {
  logError
};
