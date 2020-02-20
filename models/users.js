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
    models.Users.hasMany(models.Commons); //models.Commons, {foreignKey: 'uid'})?
    models.Users.hasMany(models.Cows);
    models.Users.hasMany(models.UserWealth);
    
    //tricky because User can have different wealth in different commons
  };
  return Users;
};