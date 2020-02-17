'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cows = sequelize.define('Cows', {
    health: DataTypes.INTEGER
  }, {});
  Cows.associate = function(models) {
    models.Cows.belongsTo(models.Users)
    models.Cows.belongsTo(models.Commons)
  };
  return Cows;
};