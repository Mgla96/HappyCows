'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserWealth = sequelize.define('UserWealth', {
    wealth: DataTypes.INTEGER
  }, {});
  UserWealth.associate = function(models) {
    models.UserWealth.belongsTo(models.Users); // association key in UserWealth model
    models.UserWealth.belongsTo(models.Commons); //association key in UserWealth model 
    // associations can be defined here
  };
  return UserWealth;
};