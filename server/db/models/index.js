'use strict';

const Image = require('./image');
const Tag = require('./tag');

Image.belongsToMany(Tag, {through: 'image_tag'})
Tag.belongsToMany(Image, {through: 'image_tag'})

module.exports = {
  Image,
  Tag
};
