const Jimp = require("jimp");
const path = require('payj');
const createCompressable = require('./image-manager-base');

async function createJimpImage(imagePath) {
    const obj = createCompressable(imagePath);
    obj.jimpImage = await Jimp.read(obj.buffer);

    obj.save = async function save(outputDir) {
      const outputPath = path.join(outputDir, this.file);
      await this.jimpImage.write(outputPath);
      return this;
    };

    obj.resize = async function(maxWidth, maxHeight) {
      this.jimpImage = await this.jimpImage.scale(scaleFactor);
      this.buffer = this.jimpImage.bitmap;
      return this;
    };

    return obj;
}

module.exports = createJimpImage;