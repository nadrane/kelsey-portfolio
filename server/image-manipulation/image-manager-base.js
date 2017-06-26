const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const path = require('path');
Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

async function createCompressable(imagePath){
  var obj = {}
  obj.absoluteFilePath = imagePath;
  obj.fileName = path.basename(imagePath);
  obj.buffer = await fs.readFileAsync(imagePath);
  obj.compress = async function compress() {
    return await imagemin.buffer(this.buffer, {
      use: [imageminMozjpeg()]
    });
  }
  return obj;
}
module.exports = createCompressable;