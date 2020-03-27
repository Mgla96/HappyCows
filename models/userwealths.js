'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserWealths = sequelize.define('UserWealths', {
    wealth: DataTypes.INTEGER,
    type: DataTypes.STRING //either initial,buy,sell,or milk
  }, {});
  UserWealths.associate = function(models) {
    models.UserWealths.belongsTo(models.Users) // association key in UserWealth model
    models.UserWealths.belongsTo(models.Commons) //association key in UserWealth model 
    // associations can be defined here
  };
  return UserWealths;
};