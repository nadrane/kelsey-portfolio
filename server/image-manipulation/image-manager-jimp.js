const Jimp = require("jimp");
const createCompressable = require('./image-manager-base');

async function createJimpImage(imagePath) {
    const obj = createCompressable(imagePath);
    obj.jimpImage = await Jimp.read(obj.buffer);

    obj.save = async function save(outputDir) {
      const outputPath = path.join(outputDir, this.file);
      await this.jimpImage.write(outputPath);
      return this;
    }

    obj.resize = async function(scaleFactor) {
      this.jimpImage = await this.jimpImage.scale(scaleFactor);
      this.buffer = this.jimpImage.bitmap;
      return this;
    }

    return obj;
}

const img = createJimpImage({
  fileName: '/Users/nickdrane/kelsey-portfolio/seed/seedImages/fullsizeoutput_55a.jpg'
});

img.then(async img => {
  img = await img.resize(.5);
  img = await img.save();
})

module.exports = createJimpImage;