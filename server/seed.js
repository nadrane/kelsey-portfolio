const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const path = require('path')

const env = require("./env");
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
  console.log('env', env)
  return readdir(path.join(env.PUBLIC_DIR, 'images')) 
    .then(images => {
      console.log('images', images)
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
