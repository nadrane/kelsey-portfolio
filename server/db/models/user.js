'use strict';

module.exports = db => db.define('user', {
  password: {
    type: db.Sequelize.VIRTUAL
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  hash: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false
  }
});
