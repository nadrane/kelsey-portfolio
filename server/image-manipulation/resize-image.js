Promise = require('bluebird');
const path = require('path');
const execFileSync = require('child_process').execFileSync;
const fs = require('fs')
const env = require('../../env');

function resizeImage(buffer, maxWidth, maxHeight) {
  const executablePath = path.join(env.BIN_DIR, 'resize-image.py');
  return execFileSync('python3', [executablePath, maxWidth, maxHeight], {input: buffer});
}

module.exports = resizeImage;