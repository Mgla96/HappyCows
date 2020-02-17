'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {});
  Users.associate = function(models) {
    models.Users.hasMany(models.Commons);
    models.Users.hasMany(models.Cows);
  };
  return Users;
};