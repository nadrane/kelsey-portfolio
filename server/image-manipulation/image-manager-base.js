const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const path = require('path');
Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

function createCompressable(buffer){
  var obj = {}
  obj.fileName = Math.random().toString(36).substring(2) + '.jpg';
  // We don't want every image instance to point to the same buffer
  // because it is going to be resized/compressed many times
  obj.buffer = new Buffer(buffer);
  obj.compress = async function compress() {
    this.buffer = await imagemin.buffer(this.buffer, {
      use: [imageminMozjpeg()]
    });
    return this;
  }
  return obj;
}
module.exports = createCompressable;