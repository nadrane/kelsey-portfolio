var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const path = require('path');
const env = require("../env");
const db = require("../server/db/db");
const {Image, User} = require("../server/db/models");

function seedDatabase() {
  return Promise.all([seedTable("images", createImages),
                      seedTable("users", createUsers)
                      ]);
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
            console.log(`finished seeding ${image.path}`)
          })
          .catch(err => {
            console.log('Failed to seed file');
            console.error(err)
          })
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

db
  .sync({ force: true })
  .then(seedDatabase)
  .then(() => console.log("seeding completed"))
  .then(() => process.exit());
