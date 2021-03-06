"use strict";

const db = require("../db");

const ImageVersion = require("./imageVersion")(db);
const Tag = require("./tag")(db);
const Image = require("./image")(db, ImageVersion);
const User = require("./user")(db);

Image.belongsTo(ImageVersion, { as: "thumbnail" });
Image.belongsTo(ImageVersion, { as: "gallery" });
Image.belongsTo(ImageVersion, { as: "original" });

Image.belongsToMany(Tag, { through: "image_tag" });
Tag.belongsToMany(Image, { through: "image_tag" });

module.exports = {
  User,
  Image,
  ImageVersion,
  Tag
};
