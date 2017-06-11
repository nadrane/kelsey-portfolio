const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')
module.exports = {
    PUBLIC_DIR,
    UNCOMPRESSED_IMAGES: path.join(PUBLIC_DIR, '/uncompressedImages'),
    IMAGES: path.join(PUBLIC_DIR, '/images')
}