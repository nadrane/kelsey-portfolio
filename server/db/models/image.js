"use strict";

var Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const Jimp = require("jimp");
const path = require("path");
const _ = require('lodash');

const env = require('../../../env');
const THUMBNAIL_SCALE_FACTOR = 0.25;
const GALLERY_SCALE_FACTOR = 0.25;
const ORIGINAL_SCALE_FACTOR = 0.25;

module.exports = (db, ImageVersion) => {
  return db.define("image", {
    path: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: db.Sequelize.STRING,
      allowNull: true
    },
    data: {
      type: db.Sequelize.VIRTUAL,
      allowNull: false,
      get() {
        return Buffer.from(this.getDataValue('data'), 'base64')
      }
    }
  }, {
    instanceMethods: {
      toJSON: function() {
        return _.omit(this.get(), ['data']);
      }
    },
    classMethods: {
      getImagesWithTagName: function getImagesWithTagName(req) {
        return db.model('tag').find({
          where: {
            name: req.tagName
          }
        }).then(tag => {
          if (tag) {
            const whereClause = { where: { tagId: tag.id } };
            return Image.find(
              Object.assign({ include: [ImageVersion] }, whereClause, req.pagination)
            );
          } else {
            return Promise.resolve([]);
          }
        })
      }
    },
    hooks: {
        afterCreate: createImageVersions
    },
    defaultScope: {
      include: [
        { model: ImageVersion, as: "gallery" },
        { model: ImageVersion, as: "thumbnail" },
        { model: ImageVersion, as: "original" }
      ]
    }
  });

  function createImageVersions(image) {
    return Promise.all([
      makeOriginalImageVersion(image),
      makeGalleryImageVersion(image),
      makeThumbnailImageVersion(image)
    ])
    .catch(err => console.error(err))
    .then(([originalVersion, galleryVersion, thumbnailVersion]) => {
      return Promise.all([
        image.setOriginal(originalVersion),
        image.setGallery(galleryVersion),
        image.setThumbnail(thumbnailVersion)
      ])
    })
  }

  function makeThumbnailImageVersion(image) {
    console.log(1)
    return makeScaledDownImageVersion(THUMBNAIL_SCALE_FACTOR, image, env.THUMBNAIL_IMAGES);
  }
  function makeGalleryImageVersion(image) {
    console.log(2)
    return makeScaledDownImageVersion(GALLERY_SCALE_FACTOR, image, env.GALLERY_IMAGES);
  }
  function makeOriginalImageVersion(image) {
    console.log(3)
    return makeScaledDownImageVersion(ORIGINAL_SCALE_FACTOR, image, env.ORIGINAL_IMAGES);
  }

  function makeScaledDownImageVersion(scalingFactor, image, dirname) {
    const absolutePath = path.join(dirname, image.path);
    return scaleDownImage(image, scalingFactor)
      .then(image => Promise.all([makeImageVersion(image), saveImage(image, absolutePath)]))
      .then(imageVersionArray => imageVersionArray[0])
  };

  function scaleDownImage(image, scalingFactor) {
    return Jimp.read(image.data).then(function(image) {
      return image.scale(scalingFactor);
    });
  }

  function makeImageVersion(image) {
    return ImageVersion.create({
      width: image.bitmap.width,
      height: image.bitmap.height
    });
  }

  function saveImage(image, absolutePath) {
    console.log(`writing ${absolutePath}`)
    return image.write(absolutePath)
  }
}