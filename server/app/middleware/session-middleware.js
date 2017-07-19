"use strict";

const router = (module.exports = require("express").Router());
const jwt = require("express-jwt");
const { SECRET } = require("../../../env/index");

router.use(
  jwt({
    secret: SECRET,
    credentialsRequired: false
  })
);
