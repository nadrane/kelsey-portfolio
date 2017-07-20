"use strict";

const express = require("express");
const router = (module.exports = new express.Router());
const cookieSession = require("cookie-session");
const { SECRET } = require("../../../env/index");

router.use(
  cookieSession({
    name: 'data',
    secret: SECRET,
    cookie: {
      secure: true,
      httpOnly: true,
      //domain: 'example.com',
      //path: 'foo/bar',
      //expires: expiryDate
    }
  })
);
