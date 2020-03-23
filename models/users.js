'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    type: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {});
  Users.associate = function(models) {
    models.Users.belongsToMany(models.Commons, {through: models.UserCommons}); 
    models.Users.hasMany(models.Cows) //association key in Cows
    models.Users.hasMany(models.UserWealths) //association key in UserWealth
  };
  return Users;
};