const createCompressable = require('./image-manager-base');
Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const resizeImage = require('./resize-image');

async function createPillowImage(imagePath) {
    const obj = await createCompressable(imagePath);

    obj.save = async function(outputDir) {
      const outputPath = path.join(outputDir, this.fileName);
      await fs.writeFileAsync(outputPath);
      return this;
    }

    obj.resize = function(maxWidth, maxHeight) {
      this.buffer = resizeImage(this.buffer, maxWidth, maxHeight);
      return this;
    };

    return obj;
}

module.exports = createPillowImage;