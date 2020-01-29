'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('users', {
    uID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true},
    name: DataTypes.STRING,
    type: DataTypes.STRING
  });

  Users.associate = function(models){
    models.Users.hasMany(models.Task);
  };

  return Users;

}