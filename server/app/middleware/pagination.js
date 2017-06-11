const express = require('express');
const router = module.exports = express.Router();

router.use(function(req, res, next) {
  if (req.query.limit) {
    if (req.query.limit > 10) {
      req.query.limit = 10;
    }
  } else {
    req.query.limit = 50;
  }

  req.pagination = {
    limit: req.query.limit,
    offset: req.query.offset
  }
  next()
})


