'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Wealth = sequelize.define('User_Wealth', {
    wealth: DataTypes.INTEGER
  }, {});
  User_Wealth.associate = function(models) {
    models.User_Wealth.belongsTo(models.Users)
    // associations can be defined here
  };
  return User_Wealth;
};