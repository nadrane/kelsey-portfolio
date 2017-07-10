const _ = require('lodash');
const parseDataUrl = require('parse-data-url');
const router = module.exports = require('express').Router();

router.use((req, res, next) => {
  req.body = _.mapValues(req.body, value => {
    const parsed = parseDataUrl(value);
    return parsed ? parsed.data : value;
  });
  next();
});