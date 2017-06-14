const express = require('express');
const router = module.exports = express.Router();

router.use(function(req, res, next) {
  if (req.query.limit) {
    if (req.query.limit > 15) {
      req.query.limit = 15;
    }
  } else {
    req.query.limit = 15;
  }

  req.pagination = {
    limit: req.query.limit,
    offset: req.query.offset
  }
  next()
})


