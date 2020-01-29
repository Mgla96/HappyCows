'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    uID: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    name: DataTypes.STRING,
    type: DataTypes.STRING
  });

  Users.associate = function(models){
    models.Users.hasMany(models.Task);
  };

  return Users;

}