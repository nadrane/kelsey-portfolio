const bluebird = require("bluebird");
const path = require("path");
const execFile = require("child_process").execFile;
const env = require("../../env");

function resizeImage(buffer, maxWidth, maxHeight) {
  return new bluebird(function(resolve, reject) {
    const executablePath = path.join(env.BIN_DIR, "resize-image.py");
    const child = execFile(
      "python3",
      [executablePath, maxWidth, maxHeight],
      { maxBuffer: 10000 * 1024, encoding: "buffer" },
      function(err, stdout, stderr) {
        if (err || stderr.toString()) reject(err || new Error(stderr.toString()));
        resolve(stdout);
      }
    );
    child.stdin.write(buffer);
    child.stdin.end();
  });
}

function calculateDimensions(buffer) {
  return new bluebird(function(resolve, reject) {
    const executablePath = path.join(env.BIN_DIR, "get-dimensions.py");
    const child = execFile("python3", [executablePath], { maxBuffer: 200 * 1024 }, function(
      err,
      stdout,
      stderr
    ) {
      if (err || stderr) reject(err || new Error(stderr));
      const [width, height] = stdout.toString().split(",");
      resolve({
        width,
        height
      });
    });
    child.stdin.write(buffer);
    child.stdin.end();
  });
}

module.exports = { resizeImage, calculateDimensions };
