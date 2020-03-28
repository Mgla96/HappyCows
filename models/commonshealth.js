'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommonsHealth = sequelize.define('CommonsHealth', {
    health: DataTypes.INTEGER
  }, {});
  CommonsHealth.associate = function(models) {
    // associations can be defined here
    models.CommonsHealth.belongsTo(models.Users) // association key in UserWealth model
    models.CommonsHealth.belongsTo(models.Commons)
  };
  return CommonsHealth;
};