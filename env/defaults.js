const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')
const ROOT = path.resolve(__dirname, '..')
module.exports = {
    PUBLIC_DIR,
    SEED_IMAGES: path.join(ROOT, 'seed', 'seedImages'),
    ORIGINAL_IMAGES: path.join(PUBLIC_DIR, 'images', 'original'),
    THUMBNAIL_IMAGES: path.join(PUBLIC_DIR, 'images', 'thumbnail'),
    GALLERY_IMAGES: path.join(PUBLIC_DIR, 'images', 'gallery')
}