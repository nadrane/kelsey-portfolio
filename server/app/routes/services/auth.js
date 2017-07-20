"use strict";

const router = module.exports = require("express").Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../../db/models');
const { AuthorizationError } = require('../../errors');

router.get('/me', (req, res) => {
  res.send(req.session);
});

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user) {
      return bcrypt.compare(req.body.password, user.hash)
        .then(passwordsAreSame => {
          if (passwordsAreSame) {
            req.session = user.toJSON();
            res.send(user);
          } else {
            next(new AuthorizationError('Invalid email or password'));
          }
        })
        .catch(next);
    } else {
      next(new AuthorizationError('Invalid email or password'));
    }
  })
  .catch(next);
});