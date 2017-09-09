'use strict';
const db = require('./db');
const { debug } = require("../loggers");

require('./models');

var syncedDbPromise = db.sync();

syncedDbPromise.then(function () {
  debug({type: "database", message: 'Sequelize models synced to PostgreSQL'});
});

module.exports = syncedDbPromise;
