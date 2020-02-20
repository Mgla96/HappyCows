'use strict';
module.exports = (sequelize, DataTypes) => {

  const UserWealth = sequelize.define('UserWealth', {
    wealth: DataTypes.INTEGER
  }, {});
  UserWealth.associate = function(models) {
    models.UserWealth.belongsTo(models.Users);
    models.UserWealth.belongsTo(models.Commons);
    // associations can be defined here
  };
  return UserWealth;
};