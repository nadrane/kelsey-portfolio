const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const BIN_DIR = path.join(ROOT, 'bin');

module.exports = {
    PUBLIC_DIR,
    BIN_DIR,
    NODE_MODULES,
    SEED_IMAGES: path.join(ROOT, 'seed', 'seedImages'),
};