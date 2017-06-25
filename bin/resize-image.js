const util = require('util');
Promise = require('bluebird');
const env = require('../env');
const path = require('path');

const exec = Promise.promisify(require('child_process').exec);

function resizeImage(imagePath, maxWidth, maxHeight, outputDir) {
  const executablePath = path.join(env.BIN_DIR, 'resize-image.py');
  return exec(`python3 ${executablePath} ${imagePath} ${maxWidth} ${maxHeight} ${outputDir}`);
}

if (require.main === module) {
  resizeImage(...process.argv.slice(2));
}

module.exports = resizeImage;