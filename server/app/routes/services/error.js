const router = module.exports = require("express").Router();
const fs = require('bluebird').promisifyAll(require('fs'));
const path = require('path');

router.post('/', (req, res) => {
  fs.appendFileAsync(path.resolve('../../../logs/errors.txt'), req.body)
  .then(() => {
    res.sendStatus(200);
  });
});