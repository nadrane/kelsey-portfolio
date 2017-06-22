"use strict";

const express = require("express");
const router = module.exports = new express.Router();
const session = require('express-session');
const SECRET = require('../../../env/index').SECRET;

router.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true } enable later with https
}))