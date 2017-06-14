const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const easyimg = require("easyimage");
const rimraf = require("rimraf");
var Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const env = require("../env");

const inputDir = env.ORIGINAL_IMAGES;
const outputDir = env.IMAGES;

rimraf(outputDir, function(err) {
  if (err) console.error(err);
  else {
    console.log("beginning image minification");
    fs.readdirAsync(inputDir)
      .then(fileNames => fileNames.forEach(compressOne))
      .catch(console.error.bind(console));
  }
});

function compressOne(imagePath) {
  return fs.readFileAsync(path.join(inputDir, imagePath))
    .then(buffer => {
      return imagemin.buffer(buffer, path.join(outputDir, imagePath), {
          use: [imageminMozjpeg()]
      })
      .then(image => {
        return easyimg.info(image).then(data => {
          console.log("info", data);
        });
      })
      .catch(console.error.bind(console));
    });
}
