'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING
  });

  Users.associate = function(models){
    models.Users.hasMany(models.Task);
  };

  return Users;

}