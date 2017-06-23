'use strict';

const bcrypt = require('bcryptjs');
const _ = require('lodash');

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
},{
  instanceMethods: {
    createHash: function() {
      return bcrypt.hash(this.password, 10)
        .then(hash => {
          this.setDataValue('hash', hash);
        });
    },
    toJSON: function () {
      return _.omit(this.get(), ['hash']);
    }
  },
  hooks: {
    beforeValidate: function(user) {
      return user.createHash();
    }
  }
});

