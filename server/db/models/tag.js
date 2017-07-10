'use strict';

module.exports = db => db.define('tag', {

  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },

});
