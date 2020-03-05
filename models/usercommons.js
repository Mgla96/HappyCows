'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCommons = sequelize.define('UserCommons', {
    log: DataTypes.STRING
  }, {});
  UserCommons.associate = function(models) {
    // associations can be defined here
  };
  return UserCommons;
};