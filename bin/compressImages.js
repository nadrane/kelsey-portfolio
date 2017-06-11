const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
var rimraf = require('rimraf');

const env = require("../env");

const inputDir = env.UNCOMPRESSED_IMAGES;
const outputDir = env.IMAGES;

rimraf(outputDir, function(err) {
  if (err) console.error(err)
  else {
    console.log("running image minification");
    imagemin([`${inputDir}/*.jpg`], outputDir, {
      use: [imageminMozjpeg()]
    }).then(files => {
      console.log("images compressed");
    })
    .catch(console.error.bind(console));
  }
})

