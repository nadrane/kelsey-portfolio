Promise = require('bluebird');
const path = require('path');
const execFileSync = require('child_process').execFileSync;
const fs = require('fs')
const env = require('../../env');

function resizeImage(buffer, maxWidth, maxHeight) {
  const executablePath = path.join(env.BIN_DIR, 'resize-image.py');
  return execFileSync('python3', [executablePath, maxWidth, maxHeight], {input: buffer});
}

function getDimensions(buffer) {
  const executablePath = path.join(env.BIN_DIR, 'get-dimensions.py');
  const dimensions = execFileSync('python3', [executablePath], {input: buffer})
  const [width, height] = dimensions.toString().split(',');
  return {
    width,
    height
  }
}

module.exports = {resizeImage, getDimensions};