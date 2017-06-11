'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

module.exports = db.define('image', {

  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})
