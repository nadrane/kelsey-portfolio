"use strict";

const express = require("express");
const router = (module.exports = new express.Router());
const session = require("express-session");
const { SECRET } = require("../../../env/index");
const { User } = require("../../db/models");

router.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true } enable later with https
  })
);

router.use(deserializeSession);

function deserializeSession(req, res, next) {
  User.findById(req.session.userId)
    .then(user => {
      req.session.user = user || {};
      next();
  });
}
