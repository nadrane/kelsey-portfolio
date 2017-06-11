'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

module.exports = db.define('tag', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

})
