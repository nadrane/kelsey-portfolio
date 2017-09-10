const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const path = require("path");
const _ = require("lodash");
const rimraf = require("rimraf");

const env = require("./env");
const db = require("./server/db/db");
const { Image, User, Tag } = require("./server/db/models");
const argv = require("minimist")(process.argv.slice(2));
const { debug, logError } = require("./server/loggers");

function seedDatabase() {
  return bluebird.all([
    seedTable("images", createImages),
    seedTable("users", createUsers)
    //seedTable('tags', createTags)
  ]);
  //.then(applyTagsToImages);
}

function seedTable(tableName, cb) {
  debug({ message: `creating ${tableName}`, type: "seeding" });
  return cb()
    .then(() => debug({ message: `${tableName} created`, type: "seeding" }))
    .catch(err => {
      logError({ message: `Error seeding ${tableName}\n`, type: "seeding", err });
    });
}

function createImages() {
  rimraf.sync(path.join(env.PUBLIC_DIR, "api-images"));
  fs.mkdirSync(path.join(env.PUBLIC_DIR, "api-images"));
  return fs
    .readdirAsync(env.SEED_IMAGES)
    .then(images => images.filter(path => !path.startsWith(".")))
    .then(images => images.filter((_, i) => i < (argv.n || Infinity)))
    .then(images => {
      return bluebird.map(images, imagePath => {
        return fs
          .readFileAsync(path.join(env.SEED_IMAGES, imagePath))
          .then(imageData => {
            debug({ message: `begin processing ${imagePath}`, type: "seeding" })
            return Image.create({
              path: imagePath,
              data: imageData.toString("base64")
            });
          })
          .then(() => debug({ message: `finished processing ${imagePath}`, type: "seeding" }))
          .catch(err => {
            logError({ message: "Image record creation failed", type: "seeding", err });
          });
      });
    });
}

function createUsers() {
  return User.create({
    email: "kelsey.thomas.hagen@gmail.com",
    password: "happyfeet",
    isAdmin: true
  });
}

function createTags() {
  return bluebird.map(["penguin", "antartica", "flower", "sea lion", "whale", "sierra"], tag => {
    return Tag.create({
      name: tag
    });
  });
}

function applyTagsToImages(images, users, tags) {
  return bluebird.map(_.range(0, _.random(0, 5)), () => {
    images.setTag(tags[_.random(tags.length - 1)]);
  });
}

db
  .sync({ force: true })
  .then(seedDatabase)
  .then(() => debug({ message: "seeding completed", type: "seeding" }))
  .then(() => process.exit());
