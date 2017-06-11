const { promisify } = require("util");
const readdir = promisify(require('fs').readdir)
const path = require('path')

const env = require("../env");
const db = require("./db/db");
const models = require("./db/models");
const Image = models.Image;

function seedDatabase() {
  return Promise.all([seedTable("images", createImages)]);
}

function seedTable(tableName, cb) {
  console.log(`creating ${tableName}`);
  return cb().then(() => console.log(`${tableName} created`));
}

function createImages() {
  return readdir(env.IMAGES) 
    .then(images => {
      return Promise.all(images.map(imagePath => {
        return Image.create({
          path: imagePath
        });
      }));
    });
}

db
  .sync({ force: true })
  .then(seedDatabase)
  .then(() => console.log("seeding completed"))
  .then(() => process.exit());
