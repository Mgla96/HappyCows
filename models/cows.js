'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cows = sequelize.define('Cows', {
    health: DataTypes.INTEGER
  }, {});
  Cows.associate = function(models) {
    models.Cows.belongsTo(Users)
    models.Cows.belongsTo(Commons)
  };
  return Cows;
};