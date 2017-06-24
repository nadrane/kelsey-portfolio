var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const _ = require('lodash');

const env = require("../env");
const db = require("../server/db/db");
const {Image, User, Tag} = require("../server/db/models");
const argv = require('minimist')(process.argv.slice(2));


function seedDatabase() {
  return Promise.all([seedTable("images", createImages),
                      seedTable("users", createUsers),
                      seedTable('tags', createTags)
                      ])
          .then(applyTagsToImages);
}

function seedTable(tableName, cb) {
  console.log(`creating ${tableName}`);
  return cb()
    .then(() => console.log(`${tableName} created`))
    .catch(err => {
      console.log(`Error seeding ${tableName}\n`);
      console.error(err);
    })
}

function createImages() {
  return fs.readdirAsync(env.SEED_IMAGES)
    .then(images => images.filter(path => !path.startsWith('.')))
    .then(images => images.filter((_, i) => i < (argv.n || Infinity)))
    .then(images => {
      return Promise.map(images, imagePath => {
        return fs.readFileAsync(path.join(env.SEED_IMAGES, imagePath))
          .then(imageData => {
            return Image.create({
              path: imagePath,
              data: imageData.toString('base64')
            });
          })
          .then(image => {
            console.log(`finished seeding ${image.path}`);
          })
          .catch(err => {
            console.log('Failed to seed file');
            console.error(err);
          });
      });
    });
}

function createUsers() {
  return User.create({
    email: 'kelsey.thomas.hagen@gmail.com',
    password: 'happyfeet',
    isAdmin: true
  });
}

function createTags() {
  return Promise.map(['penguin', 'antartica', 'flower', 'sea lion', 'whale', 'sierra'], tag => {
    return Tag.create({
      name: tag
    });
  });
}

function applyTagsToImages(images, users, tags) {
  return Promise.map(_.range(0, _.random(0, 5)), () => {
    images.setTag(tags[_.random(tags.length - 1)]);
  });
}

db
  .sync({ force: true })
  .then(seedDatabase)
  .then(() => console.log("seeding completed"))
  .then(() => process.exit());
