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

  Users.associate = function(models){ //figure out relation
    //models.Users.hasMany(models.playing);
  };

  return Users;

}