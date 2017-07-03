"use strict";

Promise = require("bluebird");
const Jimp = require("jimp");
const path = require("path");
const _ = require('lodash');
const createPILImage = require('../../image-manipulation/image-manager-pillow');

const env = require('../../../env');
const THUMBNAIL_SCALE_FACTOR = 0.25;
const GALLERY_SCALE_FACTOR = 0.25;
const ORIGINAL_SCALE_FACTOR = 0.25;

const IMAGE_SPECS = {
  thumbnail: {
    maxWidth: 500,
    maxHeight: 750
  },
  gallery: {
    maxWidth: 1500,
    maxHeight: 2250
  }
}

module.exports = (db, ImageVersion) => {
  return db.define("image", {
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

  async function createImageVersions(image) {
    try {
      const PILImage = await createPILImage(image.data);
      const imageVersions = await makeImageVersions(PILImage);
      return Promise.map(Object.keys(imageVersions), versionName => {
        const setterFunction = 'set' + capitalize(versionName);
        return image[setterFunction](imageVersions[versionName]);
      });
    } catch(err) {
      console.log('error is here', err, err.stack)
    }
  }

  function makeImageVersions(PILImage) {
    return Promise.props(_.mapValues(IMAGE_SPECS, (val, key) => prepareAndSaveImage(PILImage, val)))
  }

  async function prepareAndSaveImage(PILImage, { maxWidth, maxHeight }) {
    let imageVersion;
    await PILImage.resize(maxWidth, maxHeight);
    [imageVersion, PILImage] = await Promise.join(makeImageVersion(PILImage), PILImage.compress());
    await PILImage.save(path.join(env.PUBLIC_DIR, 'images'));
    return imageVersion;
  }

  async function makeImageVersion(PILImage) {
    return ImageVersion.create(
      Object.assign({fileName: PILImage.fileName},
      await PILImage.getDimensions()
    ));
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}