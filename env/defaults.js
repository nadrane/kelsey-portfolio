const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BIN_DIR = path.join(ROOT, 'bin');

module.exports = {
    PUBLIC_DIR,
    BIN_DIR,
    SEED_IMAGES: path.join(ROOT, 'seed', 'seedImages'),
    ORIGINAL_IMAGES: path.join(PUBLIC_DIR, 'images', 'original'),
    THUMBNAIL_IMAGES: path.join(PUBLIC_DIR, 'images', 'thumbnail'),
    GALLERY_IMAGES: path.join(PUBLIC_DIR, 'images', 'gallery')
}