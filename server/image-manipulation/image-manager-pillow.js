const createCompressable = require('./image-manager-base');
Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const resizeImage = require('./resize-image');

async function createPillowImage(imagePath) {
    const obj = await createCompressable(imagePath);

    obj.save = async function(outputDir) {
      return await fs.writeFileAsync(outputDir);
    }

    obj.resize = async function(maxWidth, maxHeight) {
      this.buffer = resizeImage(this.buffer, maxWidth, maxHeight);
    }

    return obj;
}

module.exports = createPillowImage;