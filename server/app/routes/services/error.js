const router = module.exports = require("express").Router();
const fs = require('bluebird').promisifyAll(require('fs'));

router.post('/', (req, res) => {
  fs.appendFileAsync('../../../logs/errors.txt', req.body)
  .then(() => {
    res.sendStatus(200);
  });
});