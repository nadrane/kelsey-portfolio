"use strict";

const express = require("express");
const router = module.exports = new express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { AuthorizationError } = require('../errors');

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
            req.session.userId = user.id;
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