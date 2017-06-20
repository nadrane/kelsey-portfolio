"use strict";

Promise = require("bluebird");
const Jimp = require("jimp");
const path = require("path");
const _ = require('lodash');
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");

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
        // This is a virtual field, so data will only be defined when initially posting.
        // Nevertheless, res.json will always try to access this field
        if (this.getDataValue('data')) {
          return Buffer.from(this.getDataValue('data'), 'base64');
        }
        else {
          return '';
        }
      }
    }
  }, {
      instanceMethods: {
        toJSON: function () {
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
    return makeScaledDownImageVersion(THUMBNAIL_SCALE_FACTOR, image, env.THUMBNAIL_IMAGES);
  }
  function makeGalleryImageVersion(image) {
    return makeScaledDownImageVersion(GALLERY_SCALE_FACTOR, image, env.GALLERY_IMAGES);
  }
  function makeOriginalImageVersion(image) {
    return makeScaledDownImageVersion(ORIGINAL_SCALE_FACTOR, image, env.ORIGINAL_IMAGES);
  }

  function makeScaledDownImageVersion(scalingFactor, image, dirname) {
    const outputPath = path.join(dirname, image.path);
    return scaleDownImage(image.data, scalingFactor)
      .then(image => Promise.all([makeImageVersion(image), saveImage(image, outputPath), compressImage(image.bitmap.data)]))
      .spread(imageVersion => imageVersion)
      .catch(console.error.bind(console))
  }

  function scaleDownImage(buffer, scalingFactor) {
    return Jimp.read(buffer).then(function (image) {
      return image.scale(scalingFactor);
    });
  }

  function makeImageVersion(image) {
    return ImageVersion.create({
      width: image.bitmap.width,
      height: image.bitmap.height
    });
  }

  function saveImage(image, outputPath) {
    console.log(`writing ${outputPath}`);
    return image.write(outputPath);
  }

  function compressImage(buffer) {
    console.log('compressing image');
    return imagemin.buffer(buffer, {
      use: [imageminMozjpeg()]
    });
  }
}