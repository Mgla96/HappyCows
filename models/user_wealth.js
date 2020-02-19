'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserWealth = sequelize.define('User_Wealth', {
    wealth: DataTypes.INTEGER
  }, {});
  UserWealth.associate = function(models) {
    models.UserWealth.belongsTo(models.Users)
    // associations can be defined here
  };
  return UserWealth;
};