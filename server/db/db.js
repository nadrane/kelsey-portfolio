'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const DATABASE_URI = require(path.join(__dirname, '../../env')).DATABASE_URI;
const { debug } = require("../loggers");

debug({type: "database", message: 'Opening connection to the database server'});

module.exports = new Sequelize(DATABASE_URI, {
  logging: false,
  native: false
});
