'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCommons = sequelize.define('UserCommons', {
    log: DataTypes.STRING
  }, {});
  UserCommons.associate = function(models) {
    //models.UserCommons.hasMany(models.Commons);
    //models.UserCommons.hasMany(models.Users);
    // models.UserCommons.hasOne(models.Users) 
    // models.UserCommons.hasOne(models.Commons) 
    // associations can be defined here
  };
  return UserCommons;
};