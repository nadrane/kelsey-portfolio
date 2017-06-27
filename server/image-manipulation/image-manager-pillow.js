const createCompressable = require('./image-manager-base');
Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const { resizeImage, getDimensions } = require('./PIL-functions');

const PILImage = {
    getDimensions: async function() {
      if (!this.height || !this.width) {
        const dimensions = await getDimensions(this.buffer);
        this.width = dimensions.height;
        this.height = dimensions.width;
      }
      return {
        width: this.width,
        height: this.height
      }
    },

    save: async function(outputDir) {
      const outputPath = path.join(outputDir, this.fileName);
      await fs.writeFileAsync(outputPath, this.buffer);
      return this;
    },

    resize: async function(maxWidth, maxHeight) {
      this.buffer = await resizeImage(this.buffer, maxWidth, maxHeight);
      return this;
    }
}

async function createPILImage(buffer) {
    const obj = Object.create(PILImage);
    Object.assign(obj, await createCompressable(buffer));
    return obj;
}



module.exports = createPILImage;