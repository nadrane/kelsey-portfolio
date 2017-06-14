'use strict';

module.exports = db => db.define('image_version', {
  width: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  height: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  }
})
